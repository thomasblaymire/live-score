import { render, screen, waitFor } from "@testing-library/react";
import { act, useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "../auth-context";

const TEST_EMAIL = "test@test.com";
const TEST_PASSWORD = "password";
const TEST_USER = { id: "123", email: TEST_EMAIL };

// Supabase mocking
const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockUnsubscribe = vi.fn();

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

function TestComponent() {
  const { user, loading, signIn, signUp, signInWithOAuth, signOut } = useAuth();

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
      <div data-testid="user">{user ? user.email : "No User"}</div>
      <button onClick={() => signIn(TEST_EMAIL, TEST_PASSWORD)}>Sign In</button>
      <button onClick={() => signUp(TEST_EMAIL, TEST_PASSWORD)}>Sign Up</button>
      <button onClick={() => signInWithOAuth("google")}>OAuth</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

function TestComponentWithErrorHandling() {
  const { user, loading, signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signIn(TEST_EMAIL, TEST_PASSWORD);
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

    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
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
    mockGetSession.mockResolvedValue({
      data: { session: { user: TEST_USER } },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent(TEST_EMAIL);
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });
  });

  it("handles sign in successfully", async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    screen.getByText("Sign In").click();

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
    });
  });

  it("handles sign in error", async () => {
    const mockError = new Error("Invalid credentials");
    mockSignInWithPassword.mockResolvedValue({ error: mockError });

    render(
      <AuthProvider>
        <TestComponentWithErrorHandling />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    screen.getByText("Sign In").click();

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "Invalid credentials"
      );
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
    });
  });

  it("handles sign up successfully", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: TEST_USER, session: { user: TEST_USER } },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    screen.getByText("Sign Up").click();

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
    });
  });

  it("handles OAuth sign in", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    screen.getByText("OAuth").click();

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

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    screen.getByText("Sign Out").click();

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it("updates user state on auth state change", async () => {
    let authChangeCallback: any;

    mockOnAuthStateChange.mockImplementation((callback) => {
      authChangeCallback = callback;
      return {
        data: { subscription: { unsubscribe: mockUnsubscribe } },
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
      authChangeCallback("SIGNED_IN", { user: TEST_USER });
    });

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent(TEST_EMAIL);
    });
  });

  it("cleans up subscription on unmount", async () => {
    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
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
