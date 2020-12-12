import { useEffect, useState, useRef } from 'react'

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args)
export const off = (obj: any, ...args: any[]) =>
  obj.removeEventListener(...args)

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor

type State = PermissionState | ''

const usePermission = (permissionDesc: PermissionDesc): State => {
  let { current: mounted } = useRef<boolean>(true)
  let { current: permissionStatus } = useRef<PermissionStatus | null>(null)
  const [state, setState] = useState<State>('')

  const onChange = () => {
    if (mounted) {
      setState(() => {
        return !permissionStatus ? '' : permissionStatus.state
      })
    }
  }

  useEffect(() => {
    navigator.permissions
      .query(permissionDesc)
      .then((status) => {
        permissionStatus = status
        on(permissionStatus, 'change', onChange)
        onChange()
      })
      .catch(console.error)

    return () => {
      mounted = false
      permissionStatus && off(permissionStatus, 'change', onChange)
    }
  }, [])

  return state
}

export default usePermission
