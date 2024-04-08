import React from "react";
import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <Hero>
        <Hero.Content className="flex-col lg:flex-row-reverse">
          <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Card.Body>
              <Form>
                <Form.Label title="Email" />
                <Input
                  type="text"
                  placeholder="email"
                  className="input-bordered"
                />
              </Form>
              <Form>
                <Form.Label title="Password" />
                <Input
                  type="text"
                  placeholder="password"
                  className="input-bordered"
                />
              </Form>

              <Form className="mt-6">
                <Button>Login</Button>
              </Form>
              <Form>
                <label className="label label-text-alt">
                  Don't have an account?
                  <Link to="/registration" className="label-text-alt" hover>
                    Signup
                  </Link>
                </label>
              </Form>
            </Card.Body>
          </Card>
        </Hero.Content>
      </Hero>
    </>
  );
};

export default Login;
