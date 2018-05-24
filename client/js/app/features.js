// Modules
import user from 'src/user';
import misc from 'src/misc';

import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

/* Pages require basic permission */
import SamplePage from './SamplePage';

export default [
    user,
    misc,
    Login,
    Logout,
    Signup,
    SamplePage,
];
