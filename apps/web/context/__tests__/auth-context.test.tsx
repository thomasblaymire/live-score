import { render, screen, waitFor } from "@testing-library/react";
import { act, useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "../auth-context";

// Mock Supabase client
const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
    },
  }),
}));

// Test component that uses the auth hook
function TestComponent() {
  const { user, loading, signIn, signUp, signInWithOAuth, signOut } = useAuth();

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
      <div data-testid="user">{user ? user.email : "No User"}</div>
      <button onClick={() => signIn("test@test.com", "password")}>
        Sign In
      </button>
      <button onClick={() => signUp("test@test.com", "password")}>
        Sign Up
      </button>
      <button onClick={() => signInWithOAuth("google")}>OAuth</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

// Test component with error handling for testing error cases
function TestComponentWithErrorHandling() {
  const { user, loading, signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signIn("test@test.com", "password");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
      <div data-testid="user">{user ? user.email : "No User"}</div>
      <div data-testid="error">{error || "No Error"}</div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it("provides auth context to children", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });
  });

  it("loads initial session on mount", async () => {
    const mockUser = { id: "123", email: "test@test.com" };
    mockGetSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@test.com");
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });
  });

  it("handles sign in successfully", async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    await act(async () => {
      getByText("Sign In").click();
    });

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password",
      });
    });
  });

  it("handles sign in error", async () => {
    const mockError = new Error("Invalid credentials");
    mockSignInWithPassword.mockResolvedValue({ error: mockError });

    const { getByText } = render(
      <AuthProvider>
        <TestComponentWithErrorHandling />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    // Click the button which will catch the error internally
    await act(async () => {
      getByText("Sign In").click();
    });

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "Invalid credentials"
      );
    });

    // Verify the API was called
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password",
    });
  });

  it("handles sign up successfully", async () => {
    const mockUser = { id: "123", email: "test@test.com" };
    mockSignUp.mockResolvedValue({
      data: { user: mockUser, session: { user: mockUser } },
      error: null,
    });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    await act(async () => {
      getByText("Sign Up").click();
    });

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password",
      });
    });
  });

  it("handles OAuth sign in", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    await act(async () => {
      getByText("OAuth").click();
    });

    await waitFor(() => {
      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: expect.stringContaining("/auth/callback"),
        },
      });
    });
  });

  it("handles sign out successfully", async () => {
    mockSignOut.mockResolvedValue({ error: null });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    await act(async () => {
      getByText("Sign Out").click();
    });

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it("updates user state on auth state change", async () => {
    const mockUser = { id: "123", email: "test@test.com" };
    let authChangeCallback: any;

    mockOnAuthStateChange.mockImplementation((callback) => {
      authChangeCallback = callback;
      return {
        data: { subscription: { unsubscribe: vi.fn() } },
      };
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("No User");
    });

    // Simulate auth state change
    act(() => {
      authChangeCallback("SIGNED_IN", { user: mockUser });
    });

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@test.com");
    });
  });

  it("throws error when useAuth is used outside AuthProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuth must be used within an AuthProvider");

    consoleSpy.mockRestore();
  });
});
