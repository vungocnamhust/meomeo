# meomeo
## Client
- All device have browser can be run this
- Browser will send to Server (GET, POST), then Server return HTML, CSS for browser
- Browser will use HTML, CSS for rendering UI  
- Using CSS framework will be made the page a little time before styles will kick in because browser have to download CSS file.
- `Question:`
    - element.innerHtml means?
- `Question:`
    - If you read list elements more time from server db, if whether the DOM will clear all items automatically?
    - Clear item of element list (DOM) before loading another list from server which increase performance?

## Server
- `Question:` What is package.json?
    - Manage package installed locally.
- `Question:` How can I write package.json?
    - "scripts" Contains some pairs key-value. [__value__] means the commands for running code by using npm run [__key__].
- `Question:` What does npm... command mean?
    - NPM (Node package manager) can create, manage libraries, packages for Node.js.
    - It contains libraries with hundreds of features even framework
- `Bug:` No 'Access-Control-Allow-Origin' header is present on the requested resource.  
    - This means your client does not have access right to port ... 
    - Because browser does not want js code can be talked about any server in the world unless those servers actually allow it 
    - `Solve:` Using `cors` package as `middleware`. So every request will go through middleware and it's gonna automatically add those cors headers it. 

## Idea
    - Lazy loading list element from backend.
    - Find cats 
    - Caching for finding cats

## Complete
    - Find cats