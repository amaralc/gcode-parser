/** Import libraries */
const path = require('path');
const fs = require('fs');
const util = require('util');

/** Get filepath */
const filePath = path.resolve('test.gcode');

/** Define content variable */
let content;

/** Read content of file and attribute to content variable */
fs.readFile(filePath, 'utf8', function(_,data){
  content = util.format(data);
  
  /** Split content in elements of an array */
  const contentArray = content.split('\n');

  /** Filtra linhas iniciadas em G */
  const gCodeArray = contentArray.filter(item => item.charAt('0') === 'G');

  /** Remove comments */
  const gCodeArrayWithoutComments = gCodeArray.map((item, index, array)=>{
    /** Divide string por ';' e pega primeira parte, removendo espacos no fim */
    return item.split(';')[0].trim();
  });

  /** Remove extrusions */
  const gCodeWithoutExtrusion = gCodeArrayWithoutComments.map((item, index, array)=>{
    /** Divide string por 'E' e pega primeira parte */
    return item.split('E')[0].trim();
  })

  /** Cria conteudo unido partes do array */
  const parsedContent = gCodeWithoutExtrusion.join('\n');

  /** Cria arquivo com resultado */
  fs.writeFile('parsedGcode.gcode',parsedContent, (err)=> {if(err) throw err});
  
});

