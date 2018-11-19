'use strict'

import { app, BrowserWindow,ipcMain,screen} from 'electron'
//console.log(app);
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */  
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
 
let mainWindow
let loginWindow
let loaderWindow
const winURL = process.env.NODE_ENV === 'development'? `http://localhost:9080`:`file://${__dirname}/index.html`
const loaaderURL=process.env.NODE_ENV === 'development'? `http://localhost:9080/loading.html`:`file://${__dirname}/loading.html`
//const winURL =`file:///I:/Programacion/node.js/polleras-desktop/dist/electron/index.html`;
 function  createWindow () {
  /**
   * Initial window options
   */
   loaderWindow = new BrowserWindow({
    height: 300,
    useContentSize: true,
    width: 300,
    //webPreferences:{webSecurity:false},
    show:false, 
    title:"loading", 
    //transparent:true,
    //nodeIntegrationInWorker:true,
    frame: false,// ventana sin bordde
    backgroundColor:"#009688",
    offscreen:true
    //icon:__dirname+'/../../build'
  })
   loaderWindow.on('ready-to-show',()=>loaderWindow.show())
   loaderWindow.loadURL(loaaderURL) 
   loginWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 550,
    webPreferences:{webSecurity:false},
    show:false,
    title:"Login",
    //transparent:true,
     nodeIntegrationInWorker:true,
     //frame: false// ventana sin bordde
    
    //icon:__dirname+'/../../build'
  })
//console.log(mainWindow);
loginWindow.loadURL(winURL+'#login')
 
  loginWindow.on('closed', () => {
   
    loginWindow = null
    if(mainWindow)
    {
        loaderWindow.close()
        mainWindow.close()
    }
     ;
     mainWindow = null
  })

const {width, height} = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    height: height,
    useContentSize: true,
    width: width,
    webPreferences:{webSecurity:false},
     show:false,
     nodeIntegrationInWorker:true,
      //frame: false// ventana sin bordde
    // parent:loginWindow
    //icon:__dirname+'/../../build'
  })
  mainWindow.loadURL('about:blank')
 //mainWindow.maximize();
//console.log(mainWindow);
  //mainWindow.loadURL(winURL)
  mainWindow.on('show',()=>loaderWindow.hide());
  loginWindow.on('show',()=>loaderWindow.hide());
   mainWindow.on('close', () => {
   mainWindow.webContents.send('closed-all');
  })
  mainWindow.on('closed', () => {
    // console.log('closed')
    mainWindow = null
    if(loginWindow)
    {
      loginWindow.close();
      loaderWindow.close()
    }
    
    loginWindow=null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(mainWindow)
  mainWindow.webContents.send('closed-all');
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
 
app.on('activate', () => {
  if (mainWindow === null && loginWindow===null) {
    createWindow()
  }
  //loginWindow.webContents.send('pushLogin');
}) 

ipcMain.on('login',(event,agrs)=>
{ 
  mainWindow.loadURL(winURL)
  mainWindow.webContents.send('login');
  loaderWindow.show()
  loginWindow.hide()
  //mainWindow.once('show',()=>loaderWindow.hinde());
  //mainWindow.show();
});
ipcMain.on('logout',(event,agrs)=>
{
 
  if(mainWindow.isVisible())
  {
    mainWindow.loadURL('about:blank')
    //loginWindow.on('show',()=> loginWindow.hide());
     //loginWindow.on('show',()=> mainWindow.hide());
    mainWindow.hide();
    loginWindow.show(); 
    loginWindow.webContents.send('logout',agrs);
  }
 
})

exports.loginWindow=loginWindow;
exports.loaderWindow=loaderWindow;
exports.mainWindow=mainWindow;
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
