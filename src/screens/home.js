// screens/home.js

import BdkRn from 'bdk-rn';
import React, { Fragment, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import Button from '../elements/Button';
import { styles } from '../styles/styles';
const bitcoinLogo = require('../assets/bitcoin_logo.png');
const bdkLogo = require('../assets/bdk_logo.png');

const Home = () => {
  // BDK-RN method calls and state variables will be added here
  const [mnemonic, setMnemonic] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [balance, setBalance] = useState();
  const [wallet, setWallet] = useState();
  const [syncResponse, setSyncResponse] = useState();
  const [address, setAddress] = useState();
  const [transaction, setTransaction] = useState();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState();

  const getMnemonic = async () => {
    const { data } = await BdkRn.generateMnemonic({
      length: 12,
      network: 'testnet',
    });
    console.log(data);
    setMnemonic(data);
    setDisplayText(JSON.stringify(data));
  };

  const createWallet = async () => {
    const { data } = await BdkRn.createWallet({
      mnemonic: mnemonic,
      network: 'testnet',
    });
    setWallet(data);
    setDisplayText(JSON.stringify(data));
  };

  const syncWallet = async () => {
    const { data } = await BdkRn.syncWallet();
    setSyncResponse(data);
    setDisplayText(JSON.stringify(data));
  };

  const getBalance = async () => {
    const { data } = await BdkRn.getBalance();
    setBalance(data);
    setDisplayText(data);
  };

  const getAddress = async () => {
    const { data } = await BdkRn.getNewAddress();
    setAddress(data);
    setDisplayText(data);
  };

  const sendTx = async () => {
    const { data } = await BdkRn.quickSend({
      address: recipient,
      amount: amount,
    });
    setTransaction(data);
    setDisplayText(JSON.stringify(data));
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Image
            style={{ resizeMode: 'stretch', height: 36, width: 36 }}
            source={bitcoinLogo}
          />
          <Text style={styles.headerText}>BDK-RN Tutorial</Text>
          <Image
            style={{ resizeMode: 'center', height: 40, width: 25 }}
            source={bdkLogo}
          />
        </View>

        {/* Balance */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceText} selectable>
            {'Balance: '}
          </Text>
          <Text selectable>{balance ? balance : '0'} Sats</Text>
        </View>

        {/* method call result */}
        {displayText && (
          <View style={styles.responseSection}>
            <Text style={styles.responseText} selectable>
              Response:
            </Text>
            <Text selectable>{displayText}</Text>
          </View>
        )}

        {/* buttons for method calls */}
        <View style={styles.methodSection}>
          <Button
            title="Generate Mnemonic"
            style={styles.methodButton}
            onPress={getMnemonic}
          />
          <TextInput
            style={styles.input}
            multiline
            value={mnemonic}
            onChangeText={setMnemonic}
            textAlignVertical="top"
          />
          <Button
            title="Create Wallet"
            style={styles.methodButton}
            onPress={createWallet}
          />
          <Button
            title="Sync Wallet"
            style={styles.methodButton}
            onPress={syncWallet}
          />
          <Button
            title="Get Balance"
            style={styles.methodButton}
            onPress={getBalance}
          />
          <Button
            title="Get Address"
            style={styles.methodButton}
            onPress={getAddress}
          />
        </View>
        {/* input boxes and send transaction button */}
        <View style={styles.sendSection}>
          <Fragment>
            <TextInput
              style={styles.input}
              placeholder="recipient Address"
              onChangeText={setRecipient}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (in sats)"
              onChangeText={e => setAmount(parseInt(e))}
            />
            <Button
              title="Send Transaction"
              style={styles.methodButton}
              onPress={sendTx}
            />
          </Fragment>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
