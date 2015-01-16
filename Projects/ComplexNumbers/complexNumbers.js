function getNumbers() {
  var real1 = parseFloat($('#real1').val());
  if (isNaN(real1)) {
    return -1;
  }

  var complex1 = parseFloat($('#complex1').val());
  if (isNaN(complex1)) {
    return -1;
  }

  var real2 = parseFloat($('#real2').val());
  if (isNaN(real2)) {
    return -1;
  }

  var complex2 = parseFloat($('#complex2').val());
  if (isNaN(complex2)) {
    return -1;
  } 

  return [real1, complex1, real2, complex2] 
}

function addComplex(real1, complex1, real2, complex2) {
  return [real1 + real2, complex1 + complex2];
}

function subtractComplex(real1, complex1, real2, complex2) {
  return [real1 - real2, complex1 - complex2];
}

function multiplyComplex(real1, complex1, real2, complex2) {
  return [real1*real2-complex1*complex2, complex1*real2+real1*complex2];
}

function divideComplex(real1, complex1, real2, complex2) {
  var denom = Math.pow(real2, 2) + Math.pow(complex2, 2);
  if (denom == 0) {
    return -1;
  }
  return [(real1*real2+complex1*complex2)/denom, (real2*complex1-real1*complex2)/denom];
}

$(document).ready(function() {
  $('.arithmeticButton').click(function() {
    var numbers = getNumbers();
    if (numbers == -1) {
      window.alert("Not a valid entry");
      return;
    }

    var type = $(this).attr("id");
    var result;
    if (type == 'add') {
      result = addComplex(numbers[0], numbers[1], numbers[2], numbers[3]);
    }
    else if (type == 'subtract') {
      result = subtractComplex(numbers[0], numbers[1], numbers[2], numbers[3]);
    }
    else if (type == 'multiply') {
      result = multiplyComplex(numbers[0], numbers[1], numbers[2], numbers[3]);
    }
    else if (type == 'divide') {
      result = divideComplex(numbers[0], numbers[1], numbers[2], numbers[3]);
    }

    if (result == -1) {
      $('#result').text("Result: Undefined");
    }
    else if (result[1] > 0) {
      $("#result").text("Result: "+result[0].toString()+"+"+result[1].toString()+"i");
    }
    else if (result[1] < 0) {
      $("#result").text("Result: "+result[0].toString()+result[1].toString()+"i");
    }
    else {
      $("#result").text("Result: "+result[0].toString());
    }
  })
})