import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Text,
  type TextProps,
  ActivityIndicator,
} from 'react-native'
import { S } from './styles'
import { colors } from '@/styles/theme'
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

function Button({ style, isLoading = false, children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[S.container, style]}
      {...rest}
    >
      {isLoading ? <ActivityIndicator color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  return <Text style={S.title}>{children}</Text>
}

interface IconProps {
  icon: React.ComponentType<TablerIconProps>
}
function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon
export { Button }
