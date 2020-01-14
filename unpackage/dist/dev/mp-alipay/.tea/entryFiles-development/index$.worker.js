if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../pages/home/appointmentHome/appointment/fromDoctor?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../pages/home/appointmentHome/appointment/fromHospital?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../pages/home/appointmentHome/appointment/fromDate?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../pages/home/appointmentHome/appointment/fromDepartment?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../pages/photoLogin/photoLogin?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/appointmentHome/appointmentHome?hash=7c5efb929cc2fca6c5bd12b6236d7d411f479b03');
require('../../pages/detailMessage/detailMessage?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/center/center?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pagesB/pages/center/login/login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pagesB/pages/center/login/quickRegister/quickRegister?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pagesB/pages/center/addCard/addCard?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pagesB/pages/center/addCard/editCard/editCard?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}