import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthModal } from "../auth-modal";

// Mock useAuth hook
const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignInWithOAuth = vi.fn();

vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
    signInWithOAuth: mockSignInWithOAuth,
    user: null,
    loading: false,
    signOut: vi.fn(),
  }),
}));

describe("AuthModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <AuthModal isOpen={false} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders sign in form by default", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("renders sign up form when initialMode is signup", () => {
    render(
      <AuthModal isOpen={true} onClose={mockOnClose} initialMode="signup" />
    );

    expect(
      screen.getByRole("heading", { name: "Sign Up" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("renders OAuth buttons", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByRole("button", { name: /continue with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue with github/i })
    ).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: "" }); // X button
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("switches from sign in to sign up mode", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument();

    const switchButton = screen
      .getByText(/Don't have an account/i)
      .closest("button");
    fireEvent.click(switchButton!);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Sign Up" })
      ).toBeInTheDocument();
    });
  });

  it("switches from sign up to sign in mode", async () => {
    render(
      <AuthModal isOpen={true} onClose={mockOnClose} initialMode="signup" />
    );

    expect(
      screen.getByRole("heading", { name: "Sign Up" })
    ).toBeInTheDocument();

    const switchButton = screen
      .getByText(/Already have an account/i)
      .closest("button");
    fireEvent.click(switchButton!);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Sign In" })
      ).toBeInTheDocument();
    });
  });

  describe("Sign In Form", () => {
    it("calls signIn with correct credentials", async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue(undefined);

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it("displays error message on sign in failure", async () => {
      const user = userEvent.setup();
      mockSignIn.mockRejectedValue(new Error("Invalid credentials"));

      // Suppress console.error for this test since the error logging is expected
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "wrongpassword");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });

      consoleErrorSpy.mockRestore();
    });

    it("shows loading state while signing in", async () => {
      const user = userEvent.setup();
      mockSignIn.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });
  });

  describe("Sign Up Form", () => {
    it("validates password match", async () => {
      const user = userEvent.setup();

      render(
        <AuthModal isOpen={true} onClose={mockOnClose} initialMode="signup" />
      );

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText(/^Password$/);
      const confirmInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: /sign up/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmInput, "password456");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      });
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it("validates password length", async () => {
      const user = userEvent.setup();

      render(
        <AuthModal isOpen={true} onClose={mockOnClose} initialMode="signup" />
      );

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText(/^Password$/);
      const confirmInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: /sign up/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "12345");
      await user.type(confirmInput, "12345");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Password must be at least 6 characters")
        ).toBeInTheDocument();
      });
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it("calls signUp with correct credentials", async () => {
      const user = userEvent.setup();
      mockSignUp.mockResolvedValue(undefined);

      render(
        <AuthModal isOpen={true} onClose={mockOnClose} initialMode="signup" />
      );

      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText(/^Password$/);
      const confirmInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: /sign up/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmInput, "password123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  describe("OAuth", () => {
    it("calls signInWithOAuth for Google", async () => {
      mockSignInWithOAuth.mockResolvedValue(undefined);

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const googleButton = screen.getByRole("button", {
        name: /continue with google/i,
      });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockSignInWithOAuth).toHaveBeenCalledWith("google");
      });
    });

    it("calls signInWithOAuth for GitHub", async () => {
      mockSignInWithOAuth.mockResolvedValue(undefined);

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const githubButton = screen.getByRole("button", {
        name: /continue with github/i,
      });
      fireEvent.click(githubButton);

      await waitFor(() => {
        expect(mockSignInWithOAuth).toHaveBeenCalledWith("github");
      });
    });

    it("disables OAuth buttons while loading", async () => {
      mockSignInWithOAuth.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<AuthModal isOpen={true} onClose={mockOnClose} />);

      const googleButton = screen.getByRole("button", {
        name: /continue with google/i,
      });
      fireEvent.click(googleButton);

      expect(googleButton).toBeDisabled();
      expect(
        screen.getByRole("button", { name: /continue with github/i })
      ).toBeDisabled();
    });
  });
});
