import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import '../LoginPage/LoginPage.css'

import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';

const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름을 입력해주세요.'),
        lastName: Yup.string()
          .required('성을 입력해주세요.'),
        email: Yup.string()
          .email('이메일이 유효하지 않습니다.')
          .required('이메일을 입력해주세요.'),
        password: Yup.string()
          .min(8, '패스워드는 8글자 이상이여야 합니다.')
          .max(20, '패스워드는 20글자 이내여야 합니다.')         
          .required('패스워드를 입력해주세요'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
          .required('패스워드를 다시한번 입력해주세요.')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          var num = values.password.search(/[0-9]/g);
          var eng = values.password.search(/[a-z]/ig);
          var spe = values.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
          var sqlArray = new Array(
              //sql 예약어
              "OR", "SELECT", "INSERT" , "DELETE", "UPDATE", "CREATE", "DROP", "AND", "FROM", "UNION",
              "FETCH", "DECLARE", "TRUNCATE" ,"JOIN"
          );
  
         
          if(num < 0 || eng < 0 || spe < 0 ){
              return alert('"영문, 숫자, 특수문자를 혼합하여 입력해주세요.')
          }
          var regex;
          for(var i =0; i< sqlArray.length; i++){
              regex = new RegExp(sqlArray[i], "gi");
  
              if(regex.test(values.password)){
                   alert("\""+ sqlArray[i] + "\과 같은 특정문자는 사용할 수 없습니다.") 
                   return false;
              }
            
          } 

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };


          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              window.confirm("회원가입이 완료되었습니다.\n 로그인 페이지로 이동합니다.")
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <div className="imgBx">
              <img className="mainImg" src="main_bg.png"></img>
            
            <Form className="loginform" style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
            <Title level={1} style={{textAlign:'center' ,color:'#EEEEEE', alignContent: 'center'}}>SIGN UP</Title>
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="이름"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="성"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호 확인"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary">
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </div>
          </div>

        );
      }}
    </Formik>
  );
};


export default RegisterPage
