import Portal from '@mui/material/Portal';
import { snackbarClasses, ToastRoot } from './ToastRoot';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

export function Toast() {
  return (
    <Portal>
      <ToastRoot
        expand
        gap={1}
        closeButton
        offset={16}
        visibleToasts={1}
        position="top-right"
        className={snackbarClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: snackbarClasses.toast,
            icon: snackbarClasses.icon,
            // content
            content: snackbarClasses.content,
            title: snackbarClasses.title,
            description: snackbarClasses.description,
            closeButton: snackbarClasses.closeButton,
            // state
            default: snackbarClasses.default,
            info: snackbarClasses.info,
            error: snackbarClasses.error,
            success: snackbarClasses.success,
            warning: snackbarClasses.warning
          }
        }}
        icons={{
          loading: <span className={snackbarClasses.loadingIcon} />,
          info: <InfoCircleFilled className={snackbarClasses.iconSvg} />,
          success: <CheckCircleFilled className={snackbarClasses.iconSvg} />,
          error: <ExclamationCircleOutlined className={snackbarClasses.iconSvg} />
        }}
      />
    </Portal>
  );
}
