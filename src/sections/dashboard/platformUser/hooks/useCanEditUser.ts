import { useSelector } from 'store/store';
import { RoleEnum } from 'store/type/RoleEnum';

const useCanEditUser = () => {
  const userRoles = useSelector((state) => state.auth.userRoles) || [];
  const canEdit = userRoles.includes(RoleEnum.portalAdminUserEdit);

  return { canEdit };
};

export default useCanEditUser;
