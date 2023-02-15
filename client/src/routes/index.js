import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Recover from '~/pages/Recover';
import Message from '~/pages/Message';

const routes = [
  {
    path: '/sign-in',
    Component: SignIn
  },
  {
    path: '/sign-up',
    Component: SignUp
  },
  {
    path: '/recover',
    Component: Recover
  },
  {
    path: '/',
    Component: Message
  },
];

export default routes;