import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements'

export default class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            text: '',
            displayText: '',
        };
    }
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"
        //console.log(url)
        return fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    return data.json()
                }
                else {
                    return null
                }
            })
            .then((response) => {
                var responseObject = response
                if (responseObject) {
                    var wordData = responseObject.definitions[0]
                    var definition = wordData.description
                    var lexicalCategory = wordData.wordtype
                    this.setState({
                        "word": this.state.text,
                        "definition": definition,
                        "lexicalCategory": lexicalCategory
                    })
                }
                else {
                    this.setState({
                        "word": this.state.text,
                        "definition": "Not Found",
                    })
                }
            })

        render() {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={text => {
                                this.setState({
                                    text: text,
                                    isSearchPressed: false,
                                    word: "Loading...",
                                    lexicalCategory: '',
                                    examples: [],
                                    defination: ""
                                });
                            }}
                            value={this.state.text}
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                this.setState({ isSearchPressed: true });
                                this.getWord(this.state.text)
                            }}></TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}