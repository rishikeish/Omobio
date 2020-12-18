import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

class LoginActivity extends Component{
    constructor(props) {

        super(props)

        this.state = {

            UserName: '',
            UserPassword: ''
        }

    }

    UserLoginFunction = () =>{
        const { UserName }  = this.state ;
        const { UserPassword }  = this.state ;

        fetch('http://localhost/UserLogin.php',{
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: UserName,
            password: UserPassword
          })

        }).then((response) => response.json())
              .then((json) => {

                Alert.alert(json.msg);

              }).catch((error) => {
                console.error(error);
        });
    }

    render(){
        return(
        <View style={styles.Container}>

            <TextInput
                placeholder="enter username"
                onChangeText={UserName => this.setState({UserName})}
                style={styles.TextInputStyleClass}
            />

            <TextInput
                placeholder="enter password"
                onChangeText={UserPassword => this.setState({UserPassword})}
                style={styles.TextInputStyleClass}
                secureTextEntry={true}
            />

            <Button title="Login" onPress={this.UserLoginFunction} color="#2196F3" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
Container :{
    justifyContent: 'center',
    flex:1,
    margin: 10
},

TextInputStyleClass: {

textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,

borderColor: '#2196F3',

borderRadius: 5,
}
});

export default LoginActivity;
