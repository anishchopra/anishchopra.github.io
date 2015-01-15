function determinant(matrix, size) {
    var n = size;
    if (n == 1) {
        return matrix[0][0];
    }
    if (n == 2) {
        return (matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]);
    }
    
    var det = 0.0;
    
    for (i=0; i<n; i++) {
        var newMatrix = [];
        
        for (j = 1; j < n; j++) {
            var row = matrix[j].slice();
            row.splice(i, 1);
            newMatrix.push(row);
        }
        var d = matrix[0][i]*determinant(newMatrix, size-1);
        if (i%2 == 1) {
            d *= -1;
        }
        det += d;
    }
    
    return det;
}

function getMatrix(size) {
  var matrix = new Array(size);
  for (i=0; i<size; i++) {
    matrix[i] = new Array(size);
  }
  var counter = 0;
  $('.coefficient').each(function() {
    var val = $(this).val();
    if (val == "") {
      $(this).val('0');
    }
    var value = parseFloat($(this).val());
    if (isNaN(value)) {
      matrix = -1;
      return;
    }
    
    matrix[Math.floor(counter/size)][counter%size] = value;
    counter++;
  })

  return matrix;
}

function transpose(matrix, size) {
  var newMatrix = new Array(size);
  for (i=0; i<size; i++) {
    newMatrix[i] = new Array(size);
  }

  for (i=0; i<size; i++) {
    for (j=0; j<size; j++) {
      newMatrix[j][i] = matrix[i][j];
    }
  }

  return newMatrix;
}

function coFactor(matrix, size) {
    var cm = [];
    
    var n = size;
    
    for (var i=0; i<n; i++) {
        var cRow = [];
        
        for (var j=0; j<n; j++) {
            var newMatrix = [];
            
            for (k=0; k<n; k++) {
                var temp = matrix[k].slice();
                temp.splice(j, 1);
                newMatrix.push(temp);
            }
            
            newMatrix.splice(i, 1);
            
            var cValue = determinant(newMatrix, size-1);
            
            if ((i+j)%2 == 1) {
                cValue *= -1;
            }
            
            cRow.push(cValue);
        }
        cm.push(cRow);
    }
    return cm;
}

function inverse(matrix, size) {
  var inv = coFactor(matrix, size);
  inv = transpose(inv, size);

  var det = determinant(matrix, size);
  if (det == 0) {
    return -1;
  }
  for (i=0; i<size; i++) {
    for (j=0; j<size; j++) {
      inv[i][j] = inv[i][j] / det;
    }
  }

  return inv;
}

function writeMatrix(matrix, size) {
  var counter = 0;
  $('.coefficient').each(function() {
    $(this).val(matrix[Math.floor(counter/size)][counter%size].toString());
    counter++;
  })
}


$(document).ready(function(){
  $("#matrixButton").click(function() {
    $('#matrix').remove(); // clear previous matrix, if any
    $('.operationButtons').remove();
    $('#detResult').text("");
    $('#matrixSpace').append("<div id='matrix'></div>");

    var inputHTML = "<input type='text' class='coefficient'>";
    var inputEndHTML = "<input type='text' class='coefficient end'><br>";

    var buttonsHTML = "<div class='operationButtons'><div class='operationButton' id='determinant'>Determinant</div><div class='operationButton' id='transpose'>Transpose</div><div class='operationButton' id='cofactor'>Cofactor Matrix</div><div class='operationButton' id='inverse'>Inverse</div></div>";

    var size = parseInt($("#size").val());

    if (isNaN(size) || size < 1 || size > 6) {
      window.alert("Not a valid entry");
      return;
    }

    for (i=0; i<size; i++){
      for (j=0; j<size; j++) {
        if (j != size-1) {
          $("#matrix").append(inputHTML);
        }
        else {
          $("#matrix").append(inputEndHTML);
        }
      }
    }

    $("#buttonSpace").append(buttonsHTML);



    $("#determinant").click(function() {
      var matrix = getMatrix(size);
      if (matrix == -1) {
        window.alert("Not a valid entry");
        return;
      }
      var det = determinant(matrix, size);
      $('#detResult').text("The determinant of this matrix is " + det.toString());
    })

    $('#transpose').click(function() {
      $('#detResult').text("");
      var matrix = getMatrix(size);
      if (matrix == -1) {
        window.alert("Not a valid entry");
        return;
      }
      var tr = transpose(matrix, size);
      writeMatrix(tr, size);
    })

    $('#cofactor').click(function() {
      $('#detResult').text("");
      var matrix = getMatrix(size);
      if (matrix == -1) {
        window.alert("Not a valid entry");
        return;
      }

      var cf = coFactor(matrix, size);
      writeMatrix(cf, size);
    })

    $('#inverse').click(function() {
      $('#detResult').text("");
      var matrix = getMatrix(size);
      if (matrix == -1) {
        window.alert("Not a valid entry");
        return;
      }

      var inv = inverse(matrix, size);
      if (inv == -1) {
        window.alert("This matrix is not invertible");
        return;
      }

      writeMatrix(inv, size);
    })
  })


})