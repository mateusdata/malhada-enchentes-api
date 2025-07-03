import axios from 'axios';

const BASE_URL = 'http://localhost:3001/users';

async function main() {
  let ciclo = 1;

  while (true) {
    console.log(`### Ciclo ${ciclo} ###`);

    try {
      // 1) Buscar usuários atuais
      const getUsersResp = await axios.get(BASE_URL);
      const users = getUsersResp.data;
      console.log(`GET /users - encontrou ${users.length} usuários`);

      // 2) Criar usuário
      const deviceToken = `token_${Math.floor(Math.random() * 100000)}`;
      console.log(`POST /users - criando usuário com deviceToken: ${deviceToken}`);

      const postResp = await axios.post(BASE_URL, { deviceToken });
      const userId = postResp.data.id;
      console.log(`Usuário criado com ID: ${userId}`);

      // 3) Atualizar usuário criado
      const updatedToken = `${deviceToken}_updated`;
      console.log(`PATCH /users/${userId} - atualizando deviceToken para: ${updatedToken}`);

      await axios.patch(`${BASE_URL}/${userId}`, { deviceToken: updatedToken });
      console.log('Usuário atualizado');

      // 4) Buscar todos usuários atualizados
      const allUsersResp = await axios.get(BASE_URL);
      console.log(`GET /users - total de usuários agora: ${allUsersResp.data.length}`);

    } catch (error) {
      console.error('Erro durante o ciclo:', error);
    }

    console.log('-----------------------------');

    ciclo++;

    // Intervalo de 1 segundo entre ciclos para não saturar a API
    await new Promise(res => setTimeout(res, 1000));
  }
}

main();
