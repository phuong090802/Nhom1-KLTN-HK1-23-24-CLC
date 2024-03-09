import Header from '../header'
import { Toaster } from 'sonner'

const Layout = ({ children }) => {
    return <>
        <Header />
        <Toaster
            richColors={true} />
        {children}
    </>
}

export default Layout