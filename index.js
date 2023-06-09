const { upload } = require('youtube-videos-uploader'); //vanilla javascript
const fs = require('fs-extra')

// recoveryemail is optional, only required to bypass login with recovery email if prompted for confirmation
const credentials = { email: 'email@email.com', pass: 'password', recoveryemail: 'email@email.com' }

let allVids = []

let vimeo = fs.readdirSync('vimeo')
vimeo = vimeo.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)); //remove hidden files like .DS_Store

const onVideoUploadSuccess = (videoUrl) => {
    // ..do something..
    console.log(`success uploading: ${videoUrl}`)
}

for( i in vimeo){
    // console.log( vimeo[i])

    //get the description file
    let text = fs.readFileSync(`descriptions/${vimeo[i].split('.')[0]}.description`,{encoding:"utf8"})

    //build the object
    let temp = { path: `vimeo/${vimeo[i]}`, title: `${vimeo[i].match(/^.*?(?=-\d)/gm)}`, description: text,  language: 'english', onProgress: (progress) => { console.log('progress', progress) }, tags: ['artist', 'art', 'video', 'environment', 'ecology', 'tech', 'minneapolis', 'minnesota', 'artist', 'art & technology', 'technology', 'coding', 'creative'], onSuccess:onVideoUploadSuccess, isAgeRestriction: false, isNotForKid:true}
    
    //add to the array
    allVids.push(temp);
 }

    // console.log(temp)
    

// This package uses Puppeteer, you can also pass Puppeteer launch configuration
upload (credentials, allVids, {headless:false}).then(console.log("starting..."))

// Refer Puppeteer documentation for more launch configurations like proxy etc
// https://pptr.dev/#?product=Puppeteer&version=main&show=api-puppeteerlaunchoptions