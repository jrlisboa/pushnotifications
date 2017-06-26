// https://example.com/service_worker.js

this.oninstall = function(e) {
  console.log('install');
  e.waitUntil();
}
this.onactivate = function(e) {
  console.log('activate');
}

this.onpush = function(e) {
  // Log the channel name
  console.log(e.message.channelName);
  // Log the deserialized JSON data object
  console.log(e.message.data);
  // ...

  // From here the SW can write the data to IDB, send it to any open windows,
  // etc.
}
