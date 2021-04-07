import io from 'socket.io-client';
var notifier=io('/notifications',{transports:['websocket']});
var messenger=io('/messanger',{transports:['websocket']})
export {notifier,messenger}