const { spawn } = require('child_process');

// path to compiled version of .cr file we want to run
var binary_path = "./hello_world"

var mode = 'gcp'

// Google Cloud Function vars
var gcp_req = null
var gcp_res = null

// AWS Lambda vars
var aws_event = null
var aws_context = null
var aws_callback = null

// Google Cloud Function handler
exports.wrapCrystal = (req, res) => {
  console.log('running within a Google Cloud Function')
  mode = 'gcp'
  gcp_req = req
  gcp_res = res
  wrapCrystal()
}

// AWS Lambda handler
exports.handler = (event, context, callback) => {
  console.log('running within an AWS Lambda Function')
  mode = 'aws'
  aws_event = event
  aws_context = context
  aws_callback = callback
  wrapCrystal()
}

function sendResponse(data, statusCode=200) {
  statusCode = status || 200
  if(mode == 'gcp') {
    gcp_res.status(200).send(data)
  } else {
    callback(null, data)
  }
}

// main crystal wrapper function
function wrapCrystal() {
  const cr = spawn(binary_path)
  cr.stdout.on('data', (data) => {
    console.log(data)
  })
  cr.stderr.on('data', (data) => {
    console.error(data)
  })
  cr.on('close', (code) => {
    var msg = `crystal executable exited with code: ${code}`
    if(code == 0) {
      console.log(msg)
    } else {
      console.error(msg)
    }
  })
}
