let entryFile = function (routes) {
   let usedRoutes = ''

   Object.keys(routes).forEach(route => {
      usedRoutes += `app.use('/${route}', require('./routes/${route}Routes'))\n`
   })

   let content = `const express = require('express')\nconst app = express()\nconst PORT = process.env.PORT || 3000\n\n${usedRoutes ? usedRoutes : ''}\napp.listen(PORT, () => console.log('Server started'))`

   return content
}

let routeFile = function (HTTPMethods) {
   const allowedMethods = ['get', 'delete', 'put', 'post']

   let methodsUsed = ''

   HTTPMethods.forEach(method => {
      if (allowedMethods.includes(method.toLowerCase()))
         methodsUsed += `.${method.toLowerCase()}((req,res,next)=>{\n   res.status(200).end()\n})\n`
   })

   let content = `const express = require('express')\nconst router = express.Router()\n\nrouter.route('/')\n${methodsUsed ? methodsUsed : ''}\nmodule.exports = router`

   return content
}

module.exports = {
   entryFile,
   routeFile,
}
