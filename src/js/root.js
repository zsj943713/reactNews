import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import PCNewsDetail from './components/pc_news_detail';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component {
	render() {
		return (
           <div>
               <MediaQuery query = '(min-device-width: 1224px)'>
                   <Router history={hashHistory}>
                       <Router path = "/" component={PCIndex}>
					   </Router>
                       <Router path = "/details/:uniquekey" component={PCNewsDetail}>
                       </Router>
                       <Router path = "/usercenter" component={PCUserCenter}>
                       </Router>
				   </Router>
                   {/*<PCIndex></PCIndex>*/}
			   </MediaQuery>
               <MediaQuery query = '(max-device-width: 1224px)'>
                   {/*<MobileIndex></MobileIndex>*/}
                   <Router history={hashHistory}>
                       <Router path = "/" component={MobileIndex}>
                       </Router>
                       <Router path = "/details/:uniquekey" component={MobileNewsDetail}>
                       </Router>
                       <Router path = "/MobileUserCenter" component={MobileUserCenter}>
                       </Router>
                   </Router>
               </MediaQuery>

		   </div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
