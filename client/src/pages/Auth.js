import React, {useContext, useState} from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {LOGIN_ROUTE, REGISTRARTION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data;
            if(isLogin){
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }

    }


    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
                className="mt-4"
                placeholder="Введите ваш email..."
                value={email}
                onChange={e=> setEmail(e.target.value)}
            />
            <Form.Control
                className="mt-4"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                type="password"
            />
            <Form className="d-flex justify-content-between mt-4 pl-4 pr-4">
              {isLogin ?
                  <div>
                      Нет аккаунта? <NavLink to={REGISTRARTION_ROUTE}>Зарегистрируйтесь!</NavLink>
                  </div>
                  :
                  <div>
                      Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                  </div>
              }
              <Button
                  variant={"outline-success"}
                  onClick={click}
              >
                  {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </Form>
          </Form>
        </Card>
      </Container>
    );
});

export default Auth;
