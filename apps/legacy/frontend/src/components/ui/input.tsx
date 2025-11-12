import { Input } from '@chakra-ui/react'

interface InputFieldProps {
  type: string
  placeholder: string
  dataTest: string
  value: string
  setValue: (value: string) => void
  error?: boolean
}

export function InputField({
  type,
  placeholder,
  dataTest,
  value,
  setValue,
  error,
}: InputFieldProps) {
  return (
    <Input
      borderColor={error ? 'rgb(234, 57, 67)' : '#353945'}
      background={error ? 'rgb(234 57 67 / 7%)' : 'inherit'}
      placeholder={placeholder}
      type={type}
      data-test={dataTest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      _hover={{ border: ' solid 1px rgb(56, 97, 251)' }}
    />
  )
}
