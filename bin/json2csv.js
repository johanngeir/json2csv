#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
	_ = require('lodash')

var inputStream = process.stdin

function readAllFromInputStream(cb) {
	var inputData = ''
	inputStream.on('data', function(chunk) {
		inputData += chunk
	})

	inputStream.on('end', function(err) {
		cb(err, inputData)
	})
}

readAllFromInputStream(function(err, input) {
	var json = JSON.parse(input)
	var output = json.map(function(line) {
		return _(line).values().join(';')
	}).join('\n')
	console.log(output)
	process.stdout.write(output)
})