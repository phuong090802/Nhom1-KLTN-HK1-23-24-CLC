import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import blank_avatar from '../../../../assets/images/blank_avatar.jpg';
import { colors, fonts } from '../../../../constance';
import MyIcon from '../../../component/atomic/my-icon';
import MyRichText from '../../../component/atomic/my-rich-text';
import { getConversationDetailSv } from '../../../service/cousellor/counsellorConversation.sv';
import { AppContext } from '../../AppProvider';
import { Message } from './Message';

const ConversationDetail = () => {
  const { selectedConversation, user } = useContext(AppContext);
  const [messages, setMessages] = useState([]);

  const getConversationDetail = async () => {
    try {
      const response = await getConversationDetailSv(selectedConversation);
      console.log('getConversationDetail', response?.messages);
      setMessages(response.messages);
    } catch (error) {
      console.log('getConversationDetail', error);
    }
  };

  useEffect(() => {
    if (selectedConversation !== '') {
      getConversationDetail();
    }
  }, [selectedConversation]);

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MyIcon
              iconPackage="Ionicons"
              name={'chevron-back'}
              color={'#fff'}
              size={32}
            />
          </TouchableOpacity>
          <Image source={blank_avatar} style={styles.avatar} />
          <Text style={styles.title}>Trần Nhật Hào</Text>
        </View>
        <MyIcon
          iconPackage="Ionicons"
          name={'search'}
          color={'#fff'}
          size={32}
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {messages?.map((message) => {
          return (
            <Message
              sender={message.sender === user._id}
              key={message._id}
              content={message.content}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.primary,
        }}
      >
        <MyRichText minHeight={48} />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 48,
            borderLeftWidth: 1,
            borderLeftColor: colors.primary,
            backgroundColor: '#fff',
          }}
        >
          <MyIcon
            iconPackage="Feather"
            name={'send'}
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConversationDetail;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.BahnschriftBold,
    fontSize: 22,
    marginLeft: 8,
  },
  text: {},
  fontBahnschriftBold: {
    fontFamily: fonts.BahnschriftBold,
  },
  fontBahnschrifd: {
    fontFamily: fonts.BahnschriftRegular,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
