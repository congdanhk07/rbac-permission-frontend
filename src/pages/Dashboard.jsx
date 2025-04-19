import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT, TABS_URL } from '~/utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'
import congdanhBackground from '~/assets/congdanh-bg-img.jpg'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState(
    // Lấy tab mặc định dựa vào pathname -> Optimize được chuyện dùng useEffect để hiển thị tab mặc định
    () => {
      let activeTab = TABS_URL.DASHBOARD
      Object.values(TABS_URL).forEach((tab) => {
        if (location.pathname.includes(tab)) activeTab = tab
      })
      return activeTab
    }
  )

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }
  const handleLogout = async () => {
    await handleLogoutAPI()
    // Nếu trường hợp dùng Cookie thì nhớ xóa thông tin userInfo trong local storage vì đang dùng nó để check protected route
    // localStorage.removeItem('userInfo')

    // Reset the user state to null, which will trigger the loading state
    setUser(null)

    // Redirect user to login page after remove token
    navigate('/login')
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
      setUser(res.data)
    }
    fetchData()
  }, [])

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '1em',
        gap: 2
      }}
    >
      <Box component={Link} to='/'>
        <Box
          component='img'
          src={congdanhBackground}
          alt='congdanh'
          sx={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: 2
          }}
        />
      </Box>

      <Alert severity='info' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
          {user?.email}
        </Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Alert severity='success' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Role hiện tại sau khi đăng nhập:&nbsp;
        <Typography variant='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
          {user?.role}
        </Typography>
      </Alert>

      {/* UI RBAC - DEMO WITH TABS */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Dashboard' value={TABS_URL.DASHBOARD} component={Link} to={'/dashboard'} />
              <Tab label='Support' value={TABS_URL.SUPPORT} component={Link} to={'/support'} />
              <Tab label='Message' value={TABS_URL.MESSAGE} component={Link} to={'/message'} />
              <Tab label='Revenue' value={TABS_URL.REVENUE} component={Link} to={'/revenue'} />
              <Tab label='Admin Tools' value={TABS_URL.ADMIN_TOOLS} component={Link} to={'/admin-tools'} />
            </TabList>
          </Box>
          <TabPanel value={TABS_URL.DASHBOARD}>
            <Alert variant='filled' severity='info'>
              Nội dung Dashboard dành cho tất cả các Roles
            </Alert>
          </TabPanel>
          <TabPanel value={TABS_URL.SUPPORT}>
            <Alert variant='filled' severity='info'>
              Nội dung Support dành cho tất cả các Roles
            </Alert>
          </TabPanel>
          <TabPanel value={TABS_URL.MESSAGE}>
            <Alert variant='filled' severity='warning'>
              Nội dung Message dành cho moderator trở lên
            </Alert>
          </TabPanel>
          <TabPanel value={TABS_URL.REVENUE}>
            <Alert variant='filled' severity='warning'>
              Nội dung Revenue dành cho moderator trở lên
            </Alert>
          </TabPanel>
          <TabPanel value={TABS_URL.ADMIN_TOOLS}>
            <Alert variant='filled' severity='error'>
              Nội dung Admin Tools dành cho ADMIN
            </Alert>
          </TabPanel>
        </TabContext>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Button
        onClick={handleLogout}
        type='button'
        variant='contained'
        color='info'
        size='large'
        sx={{
          mt: 2,
          maxWidth: 'min-content',
          alignSelf: 'flex-end'
        }}
      >
        LOGOUT
      </Button>
    </Box>
  )
}

export default Dashboard
