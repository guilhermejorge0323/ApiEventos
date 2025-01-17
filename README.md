# API REST EVENTOS (BÁSICA)
### Por: Guilherme Jorge

##### API REST baseada em modelo criado pelo ChatGPT

*Modelo:* ![Modelo imagem](readMe/image.png)

#### Funções:
- **Organizador:**
  - **GET** todos os organizadores ativos (`/organizador`)
  - **GET** organizadores inativos (`/organizador/inativo`)
  - **GET** organizadores ativos e inativos (`/organizador/todos`)
  - **GET** organizador específico por ID (`/organizador/:id`)

  - **POST** organizador (`/organizador`)
    - **Modelo:**
      | Nome     | Tipo    | Requerido | Descrição                                                  |
      |----------|---------|-----------|------------------------------------------------------------|
      | Nome     | STRING  | Sim       | Deve ter entre 3 e 70 caracteres                           |
      | Email    | STRING  | Sim       | Deve ser único e ser um e-mail válido                      |
      | CPF      | STRING  | Sim       | Deve ser único e um CPF válido (formatado automaticamente) |
      | Telefone | STRING  | Sim       | Deve ser único e válido (formatado automaticamente)        |
      | Ativo    | BOOLEAN | Sim       | Deve ser true ou false                                     |

  - **PUT** organizador (`/organizador/:id`)
  - **DELETE** organizador (`/organizador/:id`): Cascade apaga todos os registros relacionados.

- **Evento:**
  - **GET** todos os eventos (`/evento`)
  - **GET** todos os eventos de um organizador (`/organizador/:organizador_id/evento`)
  - **GET** evento por ID (`/evento/:id`)
  - **GET** evento de um organizador por ID (`/organizador/:organizador_id/evento/:id`)

  - **POST** evento (`/evento`)
  - **POST** evento para um organizador (ID inserido automaticamente) (`/organizador/:organizador_id/evento`)
    - **Modelo:**
      | Nome           | Tipo      | Requerido | Descrição                                                       |
      |----------------|-----------|-----------|-----------------------------------------------------------------|
      | Nome           | STRING    | Sim       | Deve ter entre 2 e 100 caracteres                               |
      | descricao      | STRING    | Sim       | Deve ter entre 3 e 500 caracteres                               |
      | data_inicio    | DATEONLY  | Sim       | Deve ser uma data no formato yyyy-mm-dd e menor que data_fim    |
      | data_fim       | DATEONLY  | Sim       | Deve ser uma data no formato yyyy-mm-dd e maior que data_inicio |
      | organizador_id | INTEGER   | Sim       | Deve ser o ID de um organizador existente                       |

  - **PUT** evento (`/evento/:id`)
  - **PUT** evento de um organizador (`/organizador/:organizador_id/evento/:id`)
  - **DELETE** evento (`/evento/:id`): Cascade apaga todos os registros relacionados.
  - **DELETE** evento de um organizador (`/organizador/:organizador_id/evento/:id`): Cascade apaga todos os registros relacionados.

- **Participante:**
  - **GET** todos os participantes de um evento (`/evento/:evento_id/participante`)
  - **GET** participante específico por evento e ID (`/evento/:evento_id/participante/:id`)

  - **POST** participante (`/evento/:evento_id/participante`)
    - **Modelo:**
      ```json
      {
          "participante": {},
          "ingresso": {}
      }
      ```
      | Nome      | Tipo    | Requerido | Descrição                                               |
      |-----------|---------|-----------|---------------------------------------------------------|
      | Nome      | STRING  | Sim       | Deve ter entre 2 e 100 caracteres                       |
      | Email     | STRING  | Sim       | Deve ser único e ser um e-mail válido                   |
      | Telefone  | STRING  | Sim       | Deve ser único e válido (formatado automaticamente)     |
      | evento_id | INTEGER | Sim       | Deve ser o ID de um evento existente                    |

  - **PUT** participante (`/evento/:evento_id/participante/:id`)
  - **DELETE** participante (`/evento/:evento_id/participante/:id`): Cascade apaga todos os registros relacionados.

- **Ingresso:**
  - **GET** todos os ingressos de um evento (`/evento/:evento_id/ingresso/`)
  - **GET** ingresso do participante (`/evento/:evento_id/participante/:participante_id/ingresso`)

  - **POST** ingresso (`/evento/:evento_id/participante`)
    - **Modelo:**
      | Nome            | Tipo      | Requerido | Descrição                                                               |
      |-----------------|-----------|-----------|-------------------------------------------------------------------------|
      | Tipo            | STRING    | Sim       | Deve ser NORMAL | VIP | CAMAROTE                                        |
      | preco           | STRING    | Sim       | Deve ser um preço válido (formatado automaticamente)                    |
      | ativo           | BOOLEAN   | Sim       | Deve ser true ou false                                                  |
      | evento_id       | INTEGER   | Sim       | Deve ser o ID de um evento existente (preenchido automaticamente)       |
      | participante_id | INTEGER   | Sim       | Deve ser o ID de um participante existente (preenchido automaticamente) |

  - **PUT** ingresso (`/evento/:evento_id/participante/:participante_id/ingresso/`): Não pode alterar os IDs.
  - **PUT** desativar ingresso (`/evento/:evento_id/participante/:participante_id/ingresso/desativar`): Desativa o ingresso.

- **Feedback:**
  - **GET** todos os feedbacks de um evento (`/evento/:evento_id/feedback`)
  - **GET** todos os feedbacks do participante (`/evento/:evento_id/participante/:participante_id/feedback/`)
  - **GET** feedback do participante (`/evento/:evento_id/participante/:participante_id/feedback/:id`)

  - **POST** feedback (`/evento/:evento_id/participante/:participante_id/feedback`)
    - **Modelo:**
      | Nome            | Tipo      | Requerido | Descrição                                                               |
      |-----------------|-----------|-----------|-------------------------------------------------------------------------|
      | comentario      | STRING    | Sim       | Deve ter entre 3 e 500 caracteres                                       |
      | nota            | INTEGER   | Sim       | Deve estar entre 0 e 5                                                  |
      | evento_id       | INTEGER   | Sim       | Deve ser o ID de um evento existente (preenchido automaticamente)       |
      | participante_id | INTEGER   | Sim       | Deve ser o ID de um participante existente (preenchido automaticamente) |

  - **PUT** feedback (`/evento/:evento_id/participante/:participante_id/feedback/:id`)
  - **DELETE** feedback (`/evento/:evento_id/participante/:participante_id/feedback/:id`)

---

### Observações:
- **Não usei soft delete.**
- **Dê um `npm i` e instale os pacotes.**
- **Crie seu próprio banco de dados MySQL e conecte.**
