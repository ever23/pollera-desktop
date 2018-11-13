'use strict'

import { app, BrowserWindow,ipcMain } from 'electron'
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

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
   loginWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 550,
    webPreferences:{webSecurity:false},
    show:true,
    
    //icon:__dirname+'/../../build'
  })
//console.log(mainWindow);
  loginWindow.loadURL(winURL+"/#/login")

  loginWindow.on('closed', () => {
   
    loginWindow = null
    if(mainWindow)
     mainWindow.close();
     mainWindow = null
  })


  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences:{webSecurity:false},
     show:false,
    // parent:loginWindow
    //icon:__dirname+'/../../build'
  })
  mainWindow.loadURL('about:blank')
 //mainWindow.maximize();
//console.log(mainWindow);
  //mainWindow.loadURL(winURL)
  mainWindow.on('show',()=>
  {
    //mainWindow.loadURL(winURL)
  })
   mainWindow.on('close', () => {
   mainWindow.webContents.send('closed-all');
  })
  mainWindow.on('closed', () => {
     console.log('closed')
    mainWindow = null
    if(loginWindow)
    loginWindow.close();
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
})

ipcMain.on('login',(event,agrs)=>
{
  mainWindow.loadURL(winURL)
  mainWindow.webContents.send('login');
  loginWindow.hide();
  mainWindow.show();
});
ipcMain.on('logout',(event,agrs)=>
{
 
  if(mainWindow.isVisible())
  {
    mainWindow.loadURL('about:blank')
    mainWindow.hide();
    loginWindow.show(); 
    loginWindow.webContents.send('logout',agrs);
  }
 
})
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
