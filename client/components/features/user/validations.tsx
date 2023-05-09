import * as yup from 'yup'

// We can split these into seperate folders as this app grows
export const signupValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .test(
      'passwords-match',
      'Passwords must match.',
      function (confirmPassword) {
        const { password } = this.parent
        return !password || password === confirmPassword
      }
    )
    .test(
      'confirmPassword-required',
      'Confirm password is required.',
      function (confirmPassword) {
        const { password } = this.parent
        return !password || !!confirmPassword
      }
    ),
})
