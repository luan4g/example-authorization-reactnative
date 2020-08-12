interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function singin(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "0asjdas0djsadjas0d0asndasndiasndas0djsa9f0wqk0f0je0fnemw0k",
        user: {
          name: "Luan",
          email: "luan.ferreira.mads@gmail.com",
        },
      });
    }, 2000);
  });
}
