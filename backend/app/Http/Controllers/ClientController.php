<?php

namespace App\Http\Controllers;

use App\Services\ClientService;
use Illuminate\Http\Request;
use Validator;

class ClientController extends Controller
{

    // Função para pegar todos os clientes que estão cadastrados no banco de dados através da Estrutura Services
    public function get(ClientService $service) {

        // invoco a função getClients que está na classe ClientService
        $clients = $service->getClients();
        if (count($clients) === 0) {
            return response()->json(['message' => 'Nenhum cliente cadastrado.'], 404);
        }

        return response()->json($clients, 200);
    }

    // Função para adicionar um cliente no banco de dados através da Estrutura Services
    public function post(Request $request, ClientService $service)
    {
        $validate = $this->validateRequest($request);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }

        $clientCreated = $service->createClient($request->all());
        if (!$clientCreated || is_null($clientCreated)) {
            return response()->json(['message' => 'Não foi possível cadastrar o cliente.'], 500);
        }

        return response()->json($clientCreated, 201);
    }

    // Função para pegar um cliente no banco de dados através da Estrutura Services
    public function getById($id, ClientService $service)
    {
        $client = $service->getClientById($id);
        if (!$client || is_null($client)) {
            return response()->json(['message' => 'Registro não encontrado.'], 404);
        }

        return response()->json($client, 200);
    }


    // Função para atualizar um cliente no banco de dados através da Estrutura Services
    public function update($id, Request $request, ClientService $service)
    {

        $obj = $request->only('name', 'register');
        //$obj['register'] = $request->only('register');

        //return response()->json($obj, 200);

        $clientCreated = $service->alterClient($id, $request->all());
        if (!$clientCreated || is_null($clientCreated)) {
            return response()->json(['message' => 'Não foi possível alterar o cliente.'], 500);
        }

        return response()->json($clientCreated, 200);
    }

    // Função para remover um cliente do banco de dados através da Estrutura Services
    public function delete($id, ClientService $service)
    {
        $client = $service->removeClient($id);
        if (!$client || is_null($client)) {
            return response()->json(['message' => 'Registro não encontrado.'], 500);
        }

        return response()->json(['message' => 'Removido com sucesso'], 200);
    }

    public function restore($id, ClientService $service) {
        return response()->json($service->restoreClient($id));
    }

    public function validateRequest(Request $request) {


        $rules = [
            'name' => 'required',
            'register' => 'required'
        ];

        $messages = [
            'name.required' => 'Informe o nome',
            'register.required' => 'Informe a situação do registro'
        ];

        return Validator::make($request->all(), $rules, $messages);
    }
}
