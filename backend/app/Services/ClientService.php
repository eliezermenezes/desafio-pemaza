<?php

namespace App\Services;


use App\Client;
use Illuminate\Http\Request;

class ClientService {

    public function getClients() {
        return Client::all();
    }

    public function getClientById($id) {
        return Client::find($id);
    }

    public function createClient($request) {
        $maxCode = Client::max('code');

        $request['code'] = $maxCode + 1;
        return Client::create($request);
        //return $request;
    }

    public function alterClient($id, $request) {
        $client = $this->getClientById($id);

        if (is_null($client)) {
            return false;
        }

        $client->fill($request);
        return $client->save();
    }

    public function removeClient($id) {
        $client = $this->getClientById($id);

        if (is_null($client)) {
            return false;
        }

        return $client->delete();
    }

    public function restoreClient($id) {
        return Client::withTrashed()->find($id)->restore();
    }

}