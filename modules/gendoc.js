const officegen = require('officegen')
const fs = require('fs')

module.exports = GenDoc;
	
function GenDoc(data){
	//console.log(data);  обработка JSON
	
	let docx = officegen('docx')

	docx.on('finalize', function(written) {
	  console.log(
		'Finish to create a Microsoft Word document.'
	  )
	})

	docx.on('error', function(err) {
	  console.log(err)
	})

	// Create a new paragraph:
	let pObj = docx.createP()
	 
	pObj.addText(data.c)
	pObj.addText(' with color', { color: '000088' })
	pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
	 
	pObj = docx.createP()
	 
	pObj.addText('Since ')
	pObj.addText('officegen 0.2.12', {
	  back: '00ffff',
	  shdType: 'pct12',
	  shdColor: 'ff0000'
	}) // Use pattern in the background.
	pObj.addText(' you can do ')
	pObj.addText('more cool ', { highlight: true }) // Highlight!
	pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.	

	// Let's generate the Word document into a file:
	let out = fs.createWriteStream('files/example.docx')
	 
	out.on('error', function(err) {
	  console.log(err)
	})
	 
	// Async call to generate the output file:
	docx.generate(out)
	
	return out;

}
	
	
	