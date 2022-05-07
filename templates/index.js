let entryFile = function (routes) {
   let usedRoutes = ''

   Object.keys(routes).forEach(route => {
      usedRoutes += `app.use('/${route}', require('./routes/${route}'))\n`
   })

   let template = [
      "const express = require('express')",
      'const app = express()',
      'const PORT = process.env.PORT || 3000\n',
      usedRoutes,
      "app.listen(PORT, () => console.log('Server started'))",
   ]

   return template.join('\n')
}

let routeFile = function (HTTPMethods) {
   const allowedMethods = ['get', 'delete', 'put', 'post']

   let methodsUsed = ''

   HTTPMethods.forEach(method => {
      if (allowedMethods.includes(method.toLowerCase()))
         methodsUsed += `.${method.toLowerCase()}((req,res,next)=>{\n   res.status(200).end()\n})\n`
   })

   let template = [
      "const express = require('express')",
      'const router = express.Router()\n',
      "router.route('/')",
      methodsUsed,
      'module.exports = router',
   ]

   return template.join('\n')
}

module.exports = {
   entryFile,
   routeFile,
}
