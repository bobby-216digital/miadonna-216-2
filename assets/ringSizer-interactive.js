$(function () {
  var ringSizer = $('#interactive-ring-sizer');
  if (ringSizer.length) {
    setInitialOptions();
    $('select', ringSizer).on('change', function () {
      var val = $(this).val();
      var prop = $(this).attr('id');
      setValues(prop, val);
    })
  }
});

function setInitialOptions() {
  for (var i = 0; i < sizeJSON.length; i++) {
    for (var property in sizeJSON[i]) {
      if (sizeJSON[i].hasOwnProperty(property)) {
        $('#' + property)
          .append($('<option>', { value: sizeJSON[i][property] })
            .text(sizeJSON[i][property])
          );
      }
    }
  };
}

function setValues(prop, val) {
  var labels = $('label.show-on-select');
  for (var i = 0; i < sizeJSON.length; i++) {
    if (sizeJSON[i].hasOwnProperty(prop) && sizeJSON[i][prop] == val) {
      labels.show();
      for (var property in sizeJSON[i]) {
        if (sizeJSON[i].hasOwnProperty(property)) {
          $('#' + property).val(sizeJSON[i][property]);
        }
      }
      return false;
    }
  }
  labels.hide();
  $('#interactive-ring-sizer form')[0].reset();
}

var sizeJSON =
  [
    {
      "ring_finger_diameter": "9.91",
      "australian_british": "-",
      "usa_canada": "0000",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "10.72",
      "australian_british": "-",
      "usa_canada": "00",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "11.53",
      "australian_british": "-",
      "usa_canada": "0",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "11.95",
      "australian_british": "A",
      "usa_canada": "1/2",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "12.18",
      "australian_british": "A 1/2",
      "usa_canada": "3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "12.37",
      "australian_british": "B",
      "usa_canada": "1",
      "french_russian": "-",
      "german": "-",
      "japanese": "1",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "12.60",
      "australian_british": "B 1/2",
      "usa_canada": "1 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "12.78",
      "australian_british": "C",
      "usa_canada": "1 1/2",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "13.00",
      "australian_british": "C 1/2",
      "usa_canada": "1 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "13.21",
      "australian_british": "D",
      "usa_canada": "2",
      "french_russian": "41 1/2",
      "german": "13 1/2",
      "japanese": "2",
      "swiss": "1 1/2"
    },
    {
      "ring_finger_diameter": "13.41",
      "australian_british": "D 1/2",
      "usa_canada": "2 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "13.61",
      "australian_british": "E",
      "usa_canada": "2 1/2",
      "french_russian": "42 3/4",
      "german": "13 3/4",
      "japanese": "3",
      "swiss": "2 3/4"
    },
    {
      "ring_finger_diameter": "13.83",
      "australian_british": "E 1/2",
      "usa_canada": "2 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "14.05",
      "australian_british": "F",
      "usa_canada": "3",
      "french_russian": "44",
      "german": "14",
      "japanese": "4",
      "swiss": "4"
    },
    {
      "ring_finger_diameter": "14.15",
      "australian_british": "F 1/2",
      "usa_canada": "3 1/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "14.25",
      "australian_british": "F 3/4",
      "usa_canada": "3 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "14.36",
      "australian_british": "G",
      "usa_canada": "3 3/8",
      "french_russian": "45 1/4",
      "german": "-",
      "japanese": "5",
      "swiss": "5 1/4"
    },
    {
      "ring_finger_diameter": "14.45",
      "australian_british": "G 1/4",
      "usa_canada": "3 1/2",
      "french_russian": "-",
      "german": "14 1/2",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "14.56",
      "australian_british": "G 1/2",
      "usa_canada": "3 5/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "6",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "14.65",
      "australian_british": "H",
      "usa_canada": "3 3/4",
      "french_russian": "46 1/2",
      "german": "-",
      "japanese": "-",
      "swiss": "6 1/2"
    },
    {
      "ring_finger_diameter": "14.86",
      "australian_british": "H 1/2",
      "usa_canada": "4",
      "french_russian": "-",
      "german": "15",
      "japanese": "7",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "15.04",
      "australian_british": "I",
      "usa_canada": "4 1/4",
      "french_russian": "47 3/4",
      "german": "-",
      "japanese": "-",
      "swiss": "7 3/4"
    },
    {
      "ring_finger_diameter": "15.27",
      "australian_british": "I 1/2",
      "usa_canada": "4 1/2",
      "french_russian": "-",
      "german": "15 1/4",
      "japanese": "8",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "15.40",
      "australian_british": "J",
      "usa_canada": "4 5/8",
      "french_russian": "49",
      "german": "15 1/2",
      "japanese": "-",
      "swiss": "9"
    },
    {
      "ring_finger_diameter": "15.53",
      "australian_british": "J 1/4",
      "usa_canada": "4 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "15.70",
      "australian_british": "J 1/2",
      "usa_canada": "5",
      "french_russian": "-",
      "german": "15 3/4",
      "japanese": "9",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "15.80",
      "australian_british": "K",
      "usa_canada": "5 1/8",
      "french_russian": "50",
      "german": "-",
      "japanese": "-",
      "swiss": "10"
    },
    {
      "ring_finger_diameter": "15.90",
      "australian_british": "K 1/4",
      "usa_canada": "5 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "16.00",
      "australian_british": "K 1/2",
      "usa_canada": "5 3/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "10",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "16.10",
      "australian_british": "L",
      "usa_canada": "5 1/2",
      "french_russian": "51 3/4",
      "german": "16",
      "japanese": "-",
      "swiss": "11 3/4"
    },
    {
      "ring_finger_diameter": "16.30",
      "australian_british": "L 1/4",
      "usa_canada": "5 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "16.41",
      "australian_british": "L 1/2",
      "usa_canada": "5 7/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "16.51",
      "australian_british": "M",
      "usa_canada": "6",
      "french_russian": "52 3/4",
      "german": "16 1/2",
      "japanese": "12",
      "swiss": "12 3/4"
    },
    {
      "ring_finger_diameter": "16.71",
      "australian_british": "M 1/2",
      "usa_canada": "6 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "16.92",
      "australian_british": "N",
      "usa_canada": "6 1/2",
      "french_russian": "54",
      "german": "17",
      "japanese": "13",
      "swiss": "14"
    },
    {
      "ring_finger_diameter": "17.13",
      "australian_british": "N 1/2",
      "usa_canada": "6 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "17.35",
      "australian_british": "O",
      "usa_canada": "7",
      "french_russian": "55 1/4",
      "german": "17 1/4",
      "japanese": "14",
      "swiss": "15 1/4"
    },
    {
      "ring_finger_diameter": "17.45",
      "australian_british": "O 1/2",
      "usa_canada": "7 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "17.75",
      "australian_british": "P",
      "usa_canada": "7 1/2",
      "french_russian": "56 1/2",
      "german": "17 3/4",
      "japanese": "15",
      "swiss": "16 1/2"
    },
    {
      "ring_finger_diameter": "17.97",
      "australian_british": "P 1/2",
      "usa_canada": "7 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "18.19",
      "australian_british": "Q",
      "usa_canada": "8",
      "french_russian": "57 3/4",
      "german": "18",
      "japanese": "16",
      "swiss": "17 3/4"
    },
    {
      "ring_finger_diameter": "18.35",
      "australian_british": "Q 1/2",
      "usa_canada": "8 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "18.53",
      "australian_british": "Q 3/4",
      "usa_canada": "8 1/2",
      "french_russian": "-",
      "german": "18 1/2",
      "japanese": "17",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "18.61",
      "australian_british": "R",
      "usa_canada": "8 5/8",
      "french_russian": "59",
      "german": "-",
      "japanese": "-",
      "swiss": "19"
    },
    {
      "ring_finger_diameter": "18.69",
      "australian_british": "R 1/4",
      "usa_canada": "8 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "18.80",
      "australian_british": "R 1/2",
      "usa_canada": "8 7/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "18.89",
      "australian_british": "R 3/4",
      "usa_canada": "9",
      "french_russian": "-",
      "german": "19",
      "japanese": "18",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "19.10",
      "australian_british": "S",
      "usa_canada": "9 1/8",
      "french_russian": "60 1/4",
      "german": "-",
      "japanese": "-",
      "swiss": "20 1/4"
    },
    {
      "ring_finger_diameter": "19.22",
      "australian_british": "S 1/4",
      "usa_canada": "9 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "19.31",
      "australian_british": "S 1/2",
      "usa_canada": "9 3/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "19.41",
      "australian_british": "S 3/4",
      "usa_canada": "9 1/2",
      "french_russian": "-",
      "german": "19 1/2",
      "japanese": "19",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "19.51",
      "australian_british": "T",
      "usa_canada": "9 5/8",
      "french_russian": "61 1/2",
      "german": "-",
      "japanese": "-",
      "swiss": "21 1/2"
    },
    {
      "ring_finger_diameter": "19.62",
      "australian_british": "T 1/4",
      "usa_canada": "9 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "19.84",
      "australian_british": "T 1/2",
      "usa_canada": "10",
      "french_russian": "-",
      "german": "20",
      "japanese": "20",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "20.02",
      "australian_british": "U",
      "usa_canada": "10 1/4",
      "french_russian": "62 3/4",
      "german": "-",
      "japanese": "21",
      "swiss": "22 3/4"
    },
    {
      "ring_finger_diameter": "20.20",
      "australian_british": "U 1/2",
      "usa_canada": "10 1/2",
      "french_russian": "-",
      "german": "20 1/4",
      "japanese": "22",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "20.32",
      "australian_british": "V",
      "usa_canada": "10 5/8",
      "french_russian": "63",
      "german": "-",
      "japanese": "-",
      "swiss": "23 3/4"
    },
    {
      "ring_finger_diameter": "20.44",
      "australian_british": "V 1/4",
      "usa_canada": "10 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "20.68",
      "australian_british": "V 1/2",
      "usa_canada": "11",
      "french_russian": "-",
      "german": "20 3/4",
      "japanese": "23",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "20.76",
      "australian_british": "W",
      "usa_canada": "11 1/8",
      "french_russian": "65",
      "german": "-",
      "japanese": "-",
      "swiss": "25"
    },
    {
      "ring_finger_diameter": "20.85",
      "australian_british": "W 1/4",
      "usa_canada": "11 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "20.94",
      "australian_british": "W 1/2",
      "usa_canada": "11 3/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "21.08",
      "australian_british": "W 3/4",
      "usa_canada": "11 1/2",
      "french_russian": "-",
      "german": "21",
      "japanese": "24",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "21.18",
      "australian_british": "X",
      "usa_canada": "11 5/8",
      "french_russian": "66 1/4",
      "german": "-",
      "japanese": "-",
      "swiss": "26 1/4"
    },
    {
      "ring_finger_diameter": "21.24",
      "australian_british": "X 1/4",
      "usa_canada": "11 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "21.30",
      "australian_british": "X 1/2",
      "usa_canada": "11 7/8",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "21.49",
      "australian_british": "Y",
      "usa_canada": "12",
      "french_russian": "67 1/2",
      "german": "21 1/4",
      "japanese": "25",
      "swiss": "27 1/2"
    },
    {
      "ring_finger_diameter": "21.69",
      "australian_british": "Y 1/2",
      "usa_canada": "12 1/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "21.89",
      "australian_british": "Z",
      "usa_canada": "12 1/2",
      "french_russian": "68 3/4",
      "german": "21 3/4",
      "japanese": "26",
      "swiss": "28 3/4"
    },
    {
      "ring_finger_diameter": "22.10",
      "australian_british": "Z +1/2",
      "usa_canada": "12 3/4",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "22.33",
      "australian_british": "Z+1",
      "usa_canada": "13",
      "french_russian": "-",
      "german": "22",
      "japanese": "27",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "22.60",
      "australian_british": "Z+1.5",
      "usa_canada": "13.5",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "22.69",
      "australian_british": "Z+2",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "22.92",
      "australian_british": "Z+2.5",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "23.06",
      "australian_british": "Z+3",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "23.24",
      "australian_british": "Z+3.5",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "23.47",
      "australian_british": "Z+4",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "23.55",
      "australian_british": "Z+4.5",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "23.87",
      "australian_british": "Z+5",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    },
    {
      "ring_finger_diameter": "24.27",
      "australian_british": "Z+6",
      "usa_canada": "-",
      "french_russian": "-",
      "german": "-",
      "japanese": "-",
      "swiss": "-"
    }
  ]