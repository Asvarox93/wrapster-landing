const StatickServer  = require ( 'static-server' );

const server = new StatickServer({
    rootPath: './dist',
    port: 3000
});

server.start(() => {
    console.log( `server started on port: ${server.port}`);
});