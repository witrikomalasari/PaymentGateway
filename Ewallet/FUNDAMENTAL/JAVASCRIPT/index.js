import React from 'react';
import {View, Text} from 'react-native';

const index = () => {
  // while
  let nilai = 1;
  while (nilai <= 3) {
    // kondisi loop nya
    console.log(`Nilai While : ${nilai}`);
    nilai++;
  }

  //Do While
  let nilaiDoWhile = 1;

  do {
    console.log(`Nilai Do While: ${nilaiDoWhile}`); // hasilnya duluan
    nilaiDoWhile++;
  } while (nilaiDoWhile <= 3); //kondisi terakhir

  // for loop
  for (let nilaiFor = 1; nilaiFor <= 3; nilaiFor++) {
    console.log(`Nilai for: ${nilaiFor}`);
  }

  // if Statement
  let nama = 'Anwar';
  if (nama === 'Anwar') {
    console.log('Halo ini Anwar');
  } else {
    console.log('Ini bukan Anwar');
  }

  // Fungsi / Function
  function MyFunction() {
    console.log('Ini Function biasa');
  }
  MyFunction();

  return (
    <View>
      <Text>INI JAVASCRIPT</Text>
    </View>
  );
};

export default index;
