const AWS = require('aws-sdk');
const waitOn = require('wait-on');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB();

const tables = [
  {
    TableName: 'Reservations',
    KeySchema: [{ AttributeName: 'reservationId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'reservationId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  },
  {
    TableName: 'Payments',
    KeySchema: [{ AttributeName: 'paymentId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'paymentId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  },
  {
    TableName: 'Notifications',
    KeySchema: [{ AttributeName: 'notificationId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'notificationId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  }
];

async function createTable(table) {
  console.log(`Iniciando criação da tabela ${table.TableName}`);
  try {
    const result = await dynamoDB.createTable(table).promise();
    console.log(`Tabela Criada: ${result.TableDescription.TableName}`);
  } catch (error) {
    console.error(`Erro ao criar a tabela ${table.TableName}: ${error.message}`);
    if (error.code === 'ResourceInUseException') {
      console.warn(`A tabela ${table.TableName} já existe.`);
    } else {
      throw error; // Rejeitar o erro para interromper a execução em caso de falha desconhecida
    }
  }
}

async function setupTables() {
  for (const table of tables) {
    await createTable(table);
  }
}

async function waitForLocalStack() {
  const opts = {
    resources: ['http://localstack:4566/'],
    delay: 1000, // initial delay in ms
    interval: 1000, // poll interval in ms
    timeout: 30000, // timeout in ms
  };

  console.log('Aguardando o LocalStack estar pronto...');
  try {
    await waitOn(opts);
    console.log('LocalStack pronto.');
  } catch (error) {
    console.error('Timeout ao aguardar o LocalStack estar pronto:', error);
    process.exit(1); // Sair do processo com status de erro
  }
}

async function setup() {
  try {
    console.log('Iniciando setup do DynamoDB...');
    await waitForLocalStack();
    await setupTables();
    console.log('Configuração concluída com sucesso.');
  } catch (error) {
    console.error('Falha ao criar setup:', error);
    process.exit(1); // Sair do processo com status de erro
  }
}

setup();