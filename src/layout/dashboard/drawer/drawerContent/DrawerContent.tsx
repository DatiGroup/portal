// project imports
import NavUser from 'layout/dashboard/drawer/drawerContent/navigation/components/NavUser';
import Navigation from 'layout/dashboard/drawer/drawerContent/navigation/Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
      </SimpleBar>
      <NavUser />
    </>
  );
}
