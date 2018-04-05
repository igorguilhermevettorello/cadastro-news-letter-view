"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var globals_1 = require('../../../globals');
var router_1 = require('@angular/router');
var HabitacoesCadastrarComponent = (function () {
    function HabitacoesCadastrarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.valor = "0,00";
        this.qtdFamiliares = 0;
        this.mostrarFormulario = true;
        this.totalizador = "0,00";
        this.habilitarSave = true;
        this.hasError = {
            titular_1: { hasError: null, msg: null },
            naturalidade_1: { hasError: null, msg: null },
            pai_1: { hasError: null, msg: null },
            mae_1: { hasError: null, msg: null },
            nascimento_1: { hasError: null, msg: null },
            estado_civil_1: { hasError: null, msg: null },
            escolaridade_1: { hasError: null, msg: null },
            cpf_1: { hasError: null, msg: null },
            rg_1: { hasError: null, msg: null },
            viculo_titular_1_com_titular_2: { hasError: null, msg: null },
            atividade_1: { hasError: null, msg: null },
            renda_1: { hasError: null, msg: null },
            informal_1: { hasError: null, msg: null },
            formal_1: { hasError: null, msg: null },
            empresa_1: { hasError: null, msg: null },
            pcd_1: { hasError: null, msg: null },
            pcd_qual_1: { hasError: null, msg: null },
            doenca_grave_1: { hasError: null, msg: null },
            doenca_qual_1: { hasError: null, msg: null },
            bolsa_familia_1: { hasError: null, msg: null },
            bolsa_familia_valor_1: { hasError: null, msg: null },
            bpc_1: { hasError: null, msg: null },
            bpc_valor_1: { hasError: null, msg: null },
            inscrito_cadastro_unico_1: { hasError: null, msg: null },
            inscricao_cadastro_unico_1: { hasError: null, msg: null },
            titular_2: { hasError: null, msg: null },
            naturalidade_2: { hasError: null, msg: null },
            pai_2: { hasError: null, msg: null },
            mae_2: { hasError: null, msg: null },
            nascimento_2: { hasError: null, msg: null },
            estado_civil_2: { hasError: null, msg: null },
            escolaridade_2: { hasError: null, msg: null },
            cpf_2: { hasError: null, msg: null },
            rg_2: { hasError: null, msg: null },
            viculo_titular_2_com_titular_1: { hasError: null, msg: null },
            atividade_2: { hasError: null, msg: null },
            renda_2: { hasError: null, msg: null },
            informal_2: { hasError: null, msg: null },
            formal_2: { hasError: null, msg: null },
            empresa_2: { hasError: null, msg: null },
            pcd_2: { hasError: null, msg: null },
            pcd_qual_2: { hasError: null, msg: null },
            doenca_grave_2: { hasError: null, msg: null },
            doenca_qual_2: { hasError: null, msg: null },
            bolsa_familia_2: { hasError: null, msg: null },
            bolsa_familia_valor_2: { hasError: null, msg: null },
            bpc_2: { hasError: null, msg: null },
            bpc_valor_2: { hasError: null, msg: null },
            inscrito_cadastro_unico_2: { hasError: null, msg: null },
            inscricao_cadastro_unico_2: { hasError: null, msg: null },
            endereco: { hasError: null, msg: null },
            numero: { hasError: null, msg: null },
            bairro: { hasError: null, msg: null },
            telefones: { hasError: null, msg: null },
            tempo_moradia_anos: { hasError: null, msg: null },
            tempo_moradia_meses: { hasError: null, msg: null },
            procedencia_municipio: { hasError: null, msg: null },
            procedencia_uf: { hasError: null, msg: null },
            cooperativa_inscricao: { hasError: null, msg: null },
            cooperativa_nome: { hasError: null, msg: null },
            moradia_atual: { hasError: null, msg: null },
            ocupacao: { hasError: null, msg: null },
            titular: { hasError: null, msg: null },
            cras: { hasError: null, msg: null },
            caps: { hasError: null, msg: null },
            associacao_moradores: { hasError: null, msg: null },
            comprovante_residencia: { hasError: null, msg: null },
            comprovante_tempo_campo_bom: { hasError: null, msg: null },
            comprovante_cpf_rg: { hasError: null, msg: null },
            comprovante_renda: { hasError: null, msg: null },
            comprovante_deficiencia_doenca_grave: { hasError: null, msg: null },
            observacao: { hasError: null, msg: null }
        };
        this.habitacoes = {
            titular_1: "",
            naturalidade_1: "",
            pai_1: "",
            mae_1: "",
            nascimento_1: "",
            estado_civil_1: "",
            escolaridade_1: "",
            cpf_1: "",
            rg_1: "",
            viculo_titular_1_com_titular_2: "",
            atividade_1: "",
            renda_1: "",
            informal_1: false,
            formal_1: false,
            empresa_1: "",
            pcd_1: false,
            pcd_qual_1: "",
            doenca_grave_1: false,
            doenca_qual_1: "",
            bolsa_familia_1: false,
            bolsa_familia_valor_1: "",
            bpc_1: false,
            bpc_valor_1: "",
            inscrito_cadastro_unico_1: false,
            inscricao_cadastro_unico_1: "",
            titular_2: "",
            naturalidade_2: "",
            pai_2: "",
            mae_2: "",
            nascimento_2: "",
            estado_civil_2: "",
            escolaridade_2: "",
            cpf_2: "",
            rg_2: "",
            viculo_titular_2_com_titular_1: "",
            atividade_2: "",
            renda_2: "",
            informal_2: false,
            formal_2: false,
            empresa_2: "",
            pcd_2: false,
            pcd_qual_2: "",
            doenca_grave_2: false,
            doenca_qual_2: "",
            bolsa_familia_2: false,
            bolsa_familia_valor_2: "",
            bpc_2: false,
            bpc_valor_2: "",
            inscrito_cadastro_unico_2: false,
            inscricao_cadastro_unico_2: "",
            endereco: "",
            numero: "",
            bairro: "",
            telefones: "",
            tempo_moradia_anos: "",
            tempo_moradia_meses: "",
            procedencia_municipio: "",
            procedencia_uf: "",
            cooperativa_inscricao: false,
            cooperativa_nome: "",
            moradia_atual: "",
            ocupacao: "",
            titular: "",
            cras: false,
            caps: false,
            associacao_moradores: false,
            comprovante_residencia: false,
            comprovante_tempo_campo_bom: false,
            comprovante_cpf_rg: false,
            comprovante_renda: false,
            comprovante_deficiencia_doenca_grave: false,
            observacao: ""
        };
        this.composicaoFamiliar = {
            nome_completo: "",
            vinculo: "",
            dt_nascimento: "",
            cpf: "",
            rg: "",
            escolaridade: "",
            atividade: "",
            pcd: false,
            pcd_qual: "",
            doenca_grave: false,
            doenca_qual: "",
            bolsa_familia: false,
            bolsa_familia_valor: "",
            bpc: false,
            bpc_valor: "",
            inscrito_cadastro_unico: false,
            inscricao_cadastro_unico: "",
            renda: ""
        };
        this.escolaridades = [
            { descricao: 'Fundamental - Incompleto' },
            { descricao: 'Fundamental - Completo' },
            { descricao: 'Médio - Incompleto' },
            { descricao: 'Médio - Completo' },
            { descricao: 'Superior - Incompleto' },
            { descricao: 'Superior - Completo' },
            { descricao: 'Pós-graduação (Lato senso) - Incompleto' },
            { descricao: 'Pós-graduação (Lato senso) - Completo' },
            { descricao: 'Pós-graduação (Stricto sensu, nível mestrado) - Incompleto' },
            { descricao: 'Pós-graduação (Stricto sensu, nível mestrado) - Completo' },
            { descricao: 'Pós-graduação (Stricto sensu, nível doutor) - Incompleto' },
            { descricao: 'Pós-graduação (Stricto sensu, nível doutor) - Completo' }
        ];
        this.estadoCivil = [
            { descricao: 'Solteiro(a)' },
            { descricao: 'Casado(a)' },
            { descricao: 'Divorciado(a)' },
            { descricao: 'Viúvo(a)' },
            { descricao: 'Separado(a)' },
            { descricao: 'União Estável' },
            { descricao: 'Outros' }
        ];
        this.titularChefe = [
            { descricao: 'PCD CHEFE' },
            { descricao: 'IDOSO CHEFE' },
            { descricao: 'MULHER CHEFE' },
            { descricao: 'HOMEM CHEFE' }
        ];
        this.ufs = [
            { value: 'RS', descricao: 'Rio Grande do Sul' },
            { value: 'AC', descricao: 'Acre' },
            { value: 'AL', descricao: 'Alagoas' },
            { value: 'AP', descricao: 'Amapá' },
            { value: 'AM', descricao: 'Amazonas' },
            { value: 'BA', descricao: 'Bahia' },
            { value: 'CE', descricao: 'Ceará' },
            { value: 'DF', descricao: 'Distrito Federal' },
            { value: 'ES', descricao: 'Espírito Santo' },
            { value: 'GO', descricao: 'Goiás' },
            { value: 'MA', descricao: 'Maranhão' },
            { value: 'MT', descricao: 'Mato Grosso' },
            { value: 'MS', descricao: 'Mato Grosso do Sul' },
            { value: 'MG', descricao: 'Minas Gerais' },
            { value: 'PA', descricao: 'Pará' },
            { value: 'PB', descricao: 'Paraíba' },
            { value: 'PR', descricao: 'Paraná' },
            { value: 'PE', descricao: 'Pernambuco' },
            { value: 'PI', descricao: 'Piauí' },
            { value: 'RJ', descricao: 'Rio de Janeiro' },
            { value: 'RN', descricao: 'Rio Grande do Norte' },
            { value: 'RO', descricao: 'Rondônia' },
            { value: 'RR', descricao: 'Roraima' },
            { value: 'SC', descricao: 'Santa Catarina' },
            { value: 'SP', descricao: 'São Paulo' },
            { value: 'SE', descricao: 'Sergipe' },
            { value: 'TO', descricao: 'Tocantins' }
        ];
        this.moradaAtual = [
            { descricao: 'Alugada' },
            { descricao: 'Cedida' },
            { descricao: 'Ocupação' }
        ];
        this.grupoFamiliar = [];
        this.familia = [];
        this.telefones = [];
        this.telefone = "";
        this.masks = [
            { id: "nascimento_1", tipo: "data" },
            { id: "cpf_1", tipo: "cpf" },
            { id: "renda_1", tipo: "dinheiro" },
            { id: "nascimento_2", tipo: "data" },
            { id: "cpf_2", tipo: "cpf" },
            { id: "renda_2", tipo: "dinheiro" },
            { id: "bolsa_familia_valor_1", tipo: "dinheiro" },
            { id: "bpc_valor_1", tipo: "dinheiro" },
            { id: "bolsa_familia_valor_2", tipo: "dinheiro" },
            { id: "bpc_valor_2", tipo: "dinheiro" },
            { id: "telefone", tipo: "telefone" },
            { id: "composicao_familiar_dt_nascimento", tipo: "data" },
            { id: "composicao_familiar_cpf", tipo: "cpf" },
            { id: "composicao_familiar_renda", tipo: "dinheiro" },
            { id: "composicao_familiar_bolsa_familia_valor", tipo: "dinheiro" },
            { id: "composicao_familiar_bpc_valor", tipo: "dinheiro" }
        ];
    }
    HabitacoesCadastrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            if (!isNaN(_this.id))
                _this.getHabitacao(_this.id);
        });
    };
    HabitacoesCadastrarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.masks.map(function (item) {
            if (item.tipo === "data") {
                _this.setMaskData(item.id);
            }
            else if (item.tipo === "dinheiro") {
                _this.setMaskMoney(item.id);
            }
            else if (item.tipo === "cpf") {
                _this.setMaskCpf(item.id);
            }
            else if (item.tipo === "telefone") {
                _this.setMaskTelefone(item.id);
            }
        });
    };
    HabitacoesCadastrarComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    HabitacoesCadastrarComponent.prototype.beforeSave = function (event) {
        event.preventDefault();
        var verificar = true;
        if (!this.habitacoes.titular_1) {
            this.hasError.titular_1.hasError = 'has-error';
            this.hasError.titular_1.msg = 'Campo Nome Titular é obrigatório';
            verificar = false;
        }
        if (!this.habitacoes.naturalidade_1) {
            this.hasError.naturalidade_1.hasError = 'has-error';
            this.hasError.naturalidade_1.msg = 'Campo naturalidade é obrigatório';
            verificar = false;
        }
        if (!this.habitacoes.mae_1) {
            this.hasError.mae_1.hasError = 'has-error';
            this.hasError.mae_1.msg = 'Campo nome da mãe é obrigatório';
            verificar = false;
        }
        if (!this.habitacoes.cpf_1) {
            this.hasError.cpf_1.hasError = 'has-error';
            this.hasError.cpf_1.msg = 'Campo cpf é obrigatório';
            verificar = false;
        }
        if (this.habitacoes.tempo_moradia_anos != "") {
            if (isNaN(parseInt(this.habitacoes.tempo_moradia_anos))) {
                console.log("if");
                this.hasError.tempo_moradia_anos.hasError = 'has-error';
                this.hasError.tempo_moradia_anos.msg = 'Campo tempo de moradia inconsistente';
                verificar = false;
            }
            else if (parseInt(this.habitacoes.tempo_moradia_anos) > 100) {
                this.hasError.tempo_moradia_anos.hasError = 'has-error';
                this.hasError.tempo_moradia_anos.msg = 'Campo tempo de moradia inconsistente';
                verificar = false;
            }
        }
        if (this.habitacoes.tempo_moradia_meses != "") {
            if (isNaN(parseInt(this.habitacoes.tempo_moradia_meses))) {
                this.hasError.tempo_moradia_anos.hasError = 'has-error';
                this.hasError.tempo_moradia_anos.msg = 'Campo tempo de moradia referente aos meses está inconsistente';
                verificar = false;
            }
            else {
                var mes = parseInt(this.habitacoes.tempo_moradia_meses);
                if (mes > 12 || mes <= 0) {
                    this.hasError.tempo_moradia_anos.hasError = 'has-error';
                    this.hasError.tempo_moradia_anos.msg = 'Campo tempo de moradia referente aos meses está inconsistente';
                    verificar = false;
                }
            }
        }
        if (verificar) {
            this.habitacoes.nascimento_1 = $("#nascimento_1").val();
            this.habitacoes.cpf_1 = $("#cpf_1").val();
            this.habitacoes.renda_1 = $("#renda_1").val();
            this.habitacoes.nascimento_2 = $("#nascimento_2").val();
            this.habitacoes.cpf_2 = $("#cpf_2").val();
            this.habitacoes.renda_2 = $("#renda_2").val();
            this.habitacoes.bolsa_familia_valor_1 = $("#bolsa_familia_valor_1").val();
            this.habitacoes.bpc_valor_1 = $("#bpc_valor_1").val();
            this.habitacoes.bolsa_familia_valor_2 = $("#bolsa_familia_valor_2").val();
            this.habitacoes.bpc_valor_2 = $("#bpc_valor_2").val();
            this.habitacoes.telefones = this.telefones.map(function (item) { return item; }).join(" | ");
            this.familia = this.grupoFamiliar.map(function (item, index) {
                if (!item.deleted) {
                    item.dt_nascimento = $("#gf_dt_nascimento_" + index).val();
                    item.renda = $("#gf_renda_" + index).val();
                    return item;
                }
            });
            this.familia = this.familia.filter(function (item) { return typeof item != "undefined"; }).map(function (item) { return item; });
            this.verificarCpf();
        }
        else {
            $("#tab-info").click();
        }
    };
    HabitacoesCadastrarComponent.prototype.verificarCpf = function () {
        var _this = this;
        var cpf1 = $("#cpf_1").val();
        var cpf2 = ($("#cpf_2").val() == "") ? 0 : $("#cpf_2").val();
        var id = isNaN(this.id) ? 0 : this.id;
        var url = this.globals.url + '/habitacoes/cpf/' + id + '/' + cpf1 + '/' + cpf2;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            _this.save();
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else if (error.status == 403) {
                var msg = error.json();
                _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
            }
            else if (error.status == 400) {
                var msg = error.json();
                if (typeof msg.msg == "undefined") {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                }
            }
            else if (error.status == 500) {
                _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    HabitacoesCadastrarComponent.prototype.save = function (event) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        var dados = {
            habitacoes: this.habitacoes,
            composicao_familiar: this.familia
        };
        if (isNaN(this.id) || this.id === "") {
            var url = this.globals.url + '/habitacoes/habitacao';
            this.http.post(url, JSON.stringify(dados), { headers: headers })
                .subscribe(function (response) {
                var res = response.json();
                _this.id = res.id;
                _this.setGrupoFamiliar(res.composicao_familiar);
                _this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
            }, function (error) {
                console.log('error', error);
                if (error.status == 0) {
                    _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
                }
                else if (error.status == 401) {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else if (error.status == 400) {
                    var msg = error.json();
                    if (typeof msg.msg == "undefined") {
                        _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                    }
                    else {
                        _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                    }
                }
                else if (error.status == 500) {
                    _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
                }
            });
        }
        else {
            var url = this.globals.url + '/habitacoes/habitacao/' + this.id;
            this.http.put(url, JSON.stringify(dados), { headers: headers })
                .subscribe(function (response) {
                var res = response.json();
                _this.setGrupoFamiliar(res.composicao_familiar);
                _this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
            }, function (error) {
                console.log('error', error);
                if (error.status == 0) {
                    _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
                }
                else if (error.status == 401) {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else if (error.status == 400) {
                    var msg = error.json();
                    if (typeof msg.msg == "undefined") {
                        _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                    }
                    else {
                        _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                    }
                }
                else if (error.status == 500) {
                    _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
                }
            });
        }
    };
    HabitacoesCadastrarComponent.prototype.getHabitacao = function (id) {
        var _this = this;
        var url = this.globals.url + '/habitacoes/habitacao/' + id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            var res = response.json();
            _this.habitacoes = res.habitacoes;
            _this.habitacoes.nascimento_1 = _this.date_format(_this.habitacoes.nascimento_1);
            _this.habitacoes.nascimento_2 = _this.date_format(_this.habitacoes.nascimento_2);
            _this.habitacoes.renda_1 = _this.number_format(_this.habitacoes.renda_1, 2, ',', '.');
            _this.habitacoes.renda_2 = _this.number_format(_this.habitacoes.renda_2, 2, ',', '.');
            _this.habitacoes.bolsa_familia_valor_1 = _this.number_format(_this.habitacoes.bolsa_familia_valor_1, 2, ',', '.');
            _this.habitacoes.bpc_valor_1 = _this.number_format(_this.habitacoes.bpc_valor_1, 2, ',', '.');
            _this.habitacoes.bolsa_familia_valor_2 = _this.number_format(_this.habitacoes.bolsa_familia_valor_2, 2, ',', '.');
            _this.habitacoes.bpc_valor_2 = _this.number_format(_this.habitacoes.bpc_valor_2, 2, ',', '.');
            _this.telefones = _this.habitacoes.telefones.split(" | ");
            _this.setGrupoFamiliar(res.composicao_familiar);
            console.log(_this.habitacoes);
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    HabitacoesCadastrarComponent.prototype.date_format = function (dt) {
        var data = new Date(dt);
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        dia = this.str_pad(dia, 2, 0, "STR_PAD_LEFT");
        mes = this.str_pad(mes, 2, 0, "STR_PAD_LEFT");
        return dia + "/" + mes + "/" + data.getFullYear();
    };
    HabitacoesCadastrarComponent.prototype.setGrupoFamiliar = function (composicao_familiar) {
        var _this = this;
        this.grupoFamiliar = [];
        this.grupoFamiliar = composicao_familiar;
        this.grupoFamiliar.map(function (item, index) {
            item.dt_nascimento = _this.date_format(item.dt_nascimento);
            item.renda = _this.number_format(item.renda, 2, ',', '.');
            item.bolsa_familia_valor = _this.number_format(item.bolsa_familia_valor, 2, ',', '.');
            item.bpc_valor = _this.number_format(item.bpc_valor, 2, ',', '.');
            //this.verificarCampo(`gf_dt_nascimento_${index}`, `data`);
            //this.verificarCampo(`gf_renda_${index}`, `dinheiro`);
        });
        this.calcularTotal();
    };
    HabitacoesCadastrarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    HabitacoesCadastrarComponent.prototype.setCheckbox = function (event, elemento, opcao) {
        event.preventDefault();
    };
    HabitacoesCadastrarComponent.prototype.addGrupoFamiliar = function (event) {
        event.preventDefault();
        this.mostrarFormulario = !this.mostrarFormulario;
        this.habilitarSave = !this.habilitarSave;
        //    let familia: any = {
        //      id: "",
        //      nome_completo: "",
        //      vinculo: "",
        //      dt_nascimento: "",
        //      cpf_rg_cn: "",
        //      escolaridade: "",
        //      atividade: "",
        //      renda: "",
        //      deleted: false
        //    };
        //
        //    let index = this.grupoFamiliar.push(familia);
        //    index = (index - 1);
        //
        //    this.verificarCampo(`gf_dt_nascimento_${index}`, `data`);
        //    this.verificarCampo(`gf_renda_${index}`, `dinheiro`);
    };
    HabitacoesCadastrarComponent.prototype.addNewGrupoFamiliar = function (event) {
        event.preventDefault();
        var familia = {
            id: "",
            nome_completo: this.composicaoFamiliar.nome_completo,
            vinculo: this.composicaoFamiliar.vinculo,
            dt_nascimento: $("#composicao_familiar_dt_nascimento").val(),
            cpf: $("#composicao_familiar_cpf").val(),
            rg: this.composicaoFamiliar.rg,
            escolaridade: this.composicaoFamiliar.escolaridade,
            atividade: this.composicaoFamiliar.atividade,
            pcd: this.composicaoFamiliar.pcd,
            pcd_qual: this.composicaoFamiliar.pcd_qual,
            doenca_grave: this.composicaoFamiliar.doenca_grave,
            doenca_qual: this.composicaoFamiliar.doenca_qual,
            bolsa_familia: this.composicaoFamiliar.bolsa_familia,
            bolsa_familia_valor: $("#composicao_familiar_bolsa_familia_valor").val(),
            bpc: this.composicaoFamiliar.bpc,
            bpc_valor: $("#composicao_familiar_bpc_valor").val(),
            inscrito_cadastro_unico: this.composicaoFamiliar.inscrito_cadastro_unico,
            inscricao_cadastro_unico: this.composicaoFamiliar.inscricao_cadastro_unico,
            renda: $("#composicao_familiar_renda").val()
        };
        this.grupoFamiliar.push(familia);
        this.mostrarFormulario = !this.mostrarFormulario;
        this.habilitarSave = !this.habilitarSave;
        this.calcularTotal();
    };
    HabitacoesCadastrarComponent.prototype.deleteComposicaoFamiliar = function (id, index) {
        var _this = this;
        var url = this.globals.url + '/composicao_familiar/composicao_familiar/' + id;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        this.http.delete(url, { headers: headers })
            .subscribe(function (response) {
            _this.removeItemGrupoFamiliarView(index);
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else if (error.status == 400) {
                var msg = error.json();
                if (typeof msg.msg == "undefined") {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                }
            }
            else if (error.status == 500) {
                _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    HabitacoesCadastrarComponent.prototype.removeItemGrupoFamiliarView = function (index) {
        this.grupoFamiliar.map(function (item, i) {
            if (i == index) {
                item.deleted = true;
            }
        });
        this.calcularTotal();
    };
    HabitacoesCadastrarComponent.prototype.removeItemGrupoFamiliar = function (event, gf, index) {
        event.preventDefault();
        if (gf.id === "") {
            this.removeItemGrupoFamiliarView(index);
        }
        else {
            this.deleteComposicaoFamiliar(gf.id, index);
        }
    };
    HabitacoesCadastrarComponent.prototype.verificarCampo = function (id, opcao) {
        var _this = this;
        if ($("#" + id).size() == 0) {
            setTimeout(function () {
                _this.verificarCampo(id, opcao);
            }, 1000);
        }
        else {
            if (opcao == 'dinheiro')
                this.setMaskMoney(id);
            if (opcao == 'data')
                this.setMaskData(id);
        }
    };
    HabitacoesCadastrarComponent.prototype.setMaskMoney = function (id) {
        $("#" + id).maskMoney({
            thousands: ".",
            decimal: ",",
            prefix: '',
            precision: 2
        });
    };
    HabitacoesCadastrarComponent.prototype.setMaskData = function (id) {
        $("#" + id).datetimepicker({
            locale: "pt-br",
            format: "DD/MM/YYYY"
        });
        $("#" + id).mask("99/99/9999");
    };
    HabitacoesCadastrarComponent.prototype.setMaskCpf = function (id) {
        $("#" + id).mask("999.999.999-99");
    };
    HabitacoesCadastrarComponent.prototype.setMaskTelefone = function (id) {
        $("#" + id).mask("(00) 0000-00009");
    };
    HabitacoesCadastrarComponent.prototype.visualizar = function (event) {
        event.preventDefault();
        console.log(this.grupoFamiliar);
    };
    HabitacoesCadastrarComponent.prototype.str_pad = function (input, padLength, padString, padType) {
        // eslint-disable-line camelcase
        //  discuss at: http://locutus.io/php/str_pad/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // improved by: Michael White (http://getsprink.com)
        //    input by: Marco van Oort
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
        //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
        //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
        //   returns 2: '------Kevin van Zonneveld-----'
        var half = '';
        var padToGo;
        var _strPadRepeater = function (s, len) {
            var collect = '';
            while (collect.length < len) {
                collect += s;
            }
            collect = collect.substr(0, len);
            return collect;
        };
        input += '';
        padString = padString !== undefined ? padString : ' ';
        if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
            padType = 'STR_PAD_RIGHT';
        }
        if ((padToGo = padLength - input.length) > 0) {
            if (padType === 'STR_PAD_LEFT') {
                input = _strPadRepeater(padString, padToGo) + input;
            }
            else if (padType === 'STR_PAD_RIGHT') {
                input = input + _strPadRepeater(padString, padToGo);
            }
            else if (padType === 'STR_PAD_BOTH') {
                half = _strPadRepeater(padString, Math.ceil(padToGo / 2));
                input = half + input + half;
                input = input.substr(0, padLength);
            }
        }
        return input;
    };
    HabitacoesCadastrarComponent.prototype.number_format = function (valor, decimals, decPoint, thousandsSep) {
        valor = (valor + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+valor) ? 0 : +valor;
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
        var dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
        var s = '';
        var toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
        // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };
    HabitacoesCadastrarComponent.prototype.calcularTotal = function () {
        var _this = this;
        var valor = 0;
        this.qtdFamiliares = 0;
        this.grupoFamiliar.map(function (item, index) {
            if (!item.deleted) {
                var renda = 0;
                var bolsa_familia_valor = 0;
                var bpc_valor = 0;
                if (item.renda !== "" || item.renda === null) {
                    renda = item.renda.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
                    renda = parseFloat(renda);
                }
                if (item.bolsa_familia_valor !== "" || item.bolsa_familia_valor === null) {
                    bolsa_familia_valor = item.bolsa_familia_valor.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
                    bolsa_familia_valor = parseFloat(bolsa_familia_valor);
                }
                if (item.bpc_valor !== "" || item.bpc_valor === null) {
                    bpc_valor = item.bpc_valor.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
                    bpc_valor = parseFloat(bpc_valor);
                }
                valor += (renda + bolsa_familia_valor + bpc_valor);
                _this.qtdFamiliares++;
            }
        });
        this.valor = this.number_format(valor, 2, ',', '.');
    };
    HabitacoesCadastrarComponent.prototype.addTelefone = function (event) {
        event.preventDefault();
        if ($("#telefone").val() != "") {
            this.telefones.push($("#telefone").val());
            $("#telefone").val("");
        }
    };
    HabitacoesCadastrarComponent.prototype.removeItemTelefones = function (event, index) {
        event.preventDefault();
        this.telefones.splice(index, 1);
    };
    HabitacoesCadastrarComponent.prototype.calcularTotalizador = function () {
        var val1 = $("#renda_1").val() || "0,00";
        var val2 = $("#renda_2").val() || "0,00";
        val1 = val1.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
        val2 = val2.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
        val1 = parseFloat(parseFloat(val1).toFixed(2));
        val2 = parseFloat(parseFloat(val2).toFixed(2));
        var total = (val1 + val2);
        this.totalizador = this.number_format(total, 2, ',', '.');
    };
    HabitacoesCadastrarComponent.prototype.limparForm = function (event) {
        event.preventDefault();
        this.hasError = {
            titular_1: { hasError: null, msg: null },
            naturalidade_1: { hasError: null, msg: null },
            pai_1: { hasError: null, msg: null },
            mae_1: { hasError: null, msg: null },
            nascimento_1: { hasError: null, msg: null },
            estado_civil_1: { hasError: null, msg: null },
            escolaridade_1: { hasError: null, msg: null },
            cpf_1: { hasError: null, msg: null },
            rg_1: { hasError: null, msg: null },
            viculo_titular_1_com_titular_2: { hasError: null, msg: null },
            atividade_1: { hasError: null, msg: null },
            renda_1: { hasError: null, msg: null },
            informal_1: { hasError: null, msg: null },
            formal_1: { hasError: null, msg: null },
            empresa_1: { hasError: null, msg: null },
            pcd_1: { hasError: null, msg: null },
            pcd_qual_1: { hasError: null, msg: null },
            doenca_grave_1: { hasError: null, msg: null },
            doenca_qual_1: { hasError: null, msg: null },
            bolsa_familia_1: { hasError: null, msg: null },
            bolsa_familia_valor_1: { hasError: null, msg: null },
            bpc_1: { hasError: null, msg: null },
            bpc_valor_1: { hasError: null, msg: null },
            inscrito_cadastro_unico_1: { hasError: null, msg: null },
            inscricao_cadastro_unico_1: { hasError: null, msg: null },
            titular_2: { hasError: null, msg: null },
            naturalidade_2: { hasError: null, msg: null },
            pai_2: { hasError: null, msg: null },
            mae_2: { hasError: null, msg: null },
            nascimento_2: { hasError: null, msg: null },
            estado_civil_2: { hasError: null, msg: null },
            escolaridade_2: { hasError: null, msg: null },
            cpf_2: { hasError: null, msg: null },
            rg_2: { hasError: null, msg: null },
            viculo_titular_2_com_titular_1: { hasError: null, msg: null },
            atividade_2: { hasError: null, msg: null },
            renda_2: { hasError: null, msg: null },
            informal_2: { hasError: null, msg: null },
            formal_2: { hasError: null, msg: null },
            empresa_2: { hasError: null, msg: null },
            pcd_2: { hasError: null, msg: null },
            pcd_qual_2: { hasError: null, msg: null },
            doenca_grave_2: { hasError: null, msg: null },
            doenca_qual_2: { hasError: null, msg: null },
            bolsa_familia_2: { hasError: null, msg: null },
            bolsa_familia_valor_2: { hasError: null, msg: null },
            bpc_2: { hasError: null, msg: null },
            bpc_valor_2: { hasError: null, msg: null },
            inscrito_cadastro_unico_2: { hasError: null, msg: null },
            inscricao_cadastro_unico_2: { hasError: null, msg: null },
            endereco: { hasError: null, msg: null },
            numero: { hasError: null, msg: null },
            bairro: { hasError: null, msg: null },
            telefones: { hasError: null, msg: null },
            tempo_moradia_anos: { hasError: null, msg: null },
            tempo_moradia_meses: { hasError: null, msg: null },
            procedencia_municipio: { hasError: null, msg: null },
            procedencia_uf: { hasError: null, msg: null },
            cooperativa_inscricao: { hasError: null, msg: null },
            cooperativa_nome: { hasError: null, msg: null },
            moradia_atual: { hasError: null, msg: null },
            ocupacao: { hasError: null, msg: null },
            titular: { hasError: null, msg: null },
            cras: { hasError: null, msg: null },
            caps: { hasError: null, msg: null },
            associacao_moradores: { hasError: null, msg: null },
            comprovante_residencia: { hasError: null, msg: null },
            comprovante_tempo_campo_bom: { hasError: null, msg: null },
            comprovante_cpf_rg: { hasError: null, msg: null },
            comprovante_renda: { hasError: null, msg: null },
            comprovante_deficiencia_doenca_grave: { hasError: null, msg: null },
            observacao: { hasError: null, msg: null }
        };
        this.habitacoes = {
            titular_1: "",
            naturalidade_1: "",
            pai_1: "",
            mae_1: "",
            nascimento_1: "",
            estado_civil_1: "",
            escolaridade_1: "",
            cpf_1: "",
            rg_1: "",
            viculo_titular_1_com_titular_2: "",
            atividade_1: "",
            renda_1: "",
            informal_1: false,
            formal_1: false,
            empresa_1: "",
            pcd_1: false,
            pcd_qual_1: "",
            doenca_grave_1: false,
            doenca_qual_1: "",
            bolsa_familia_1: false,
            bolsa_familia_valor_1: "",
            bpc_1: false,
            bpc_valor_1: "",
            inscrito_cadastro_unico_1: false,
            inscricao_cadastro_unico_1: "",
            titular_2: "",
            naturalidade_2: "",
            pai_2: "",
            mae_2: "",
            nascimento_2: "",
            estado_civil_2: "",
            escolaridade_2: "",
            cpf_2: "",
            rg_2: "",
            viculo_titular_2_com_titular_1: "",
            atividade_2: "",
            renda_2: "",
            informal_2: false,
            formal_2: false,
            empresa_2: "",
            pcd_2: false,
            pcd_qual_2: "",
            doenca_grave_2: false,
            doenca_qual_2: "",
            bolsa_familia_2: false,
            bolsa_familia_valor_2: "",
            bpc_2: false,
            bpc_valor_2: "",
            inscrito_cadastro_unico_2: false,
            inscricao_cadastro_unico_2: "",
            endereco: "",
            numero: "",
            bairro: "",
            telefones: "",
            tempo_moradia_anos: "",
            tempo_moradia_meses: "",
            procedencia_municipio: "",
            procedencia_uf: "",
            cooperativa_inscricao: false,
            cooperativa_nome: "",
            moradia_atual: "",
            ocupacao: "",
            titular: "",
            cras: false,
            caps: false,
            associacao_moradores: false,
            comprovante_residencia: false,
            comprovante_tempo_campo_bom: false,
            comprovante_cpf_rg: false,
            comprovante_renda: false,
            comprovante_deficiencia_doenca_grave: false,
            observacao: ""
        };
        this.grupoFamiliar = [];
    };
    HabitacoesCadastrarComponent.prototype.fecharView = function (event) {
        event.preventDefault();
        this.router.navigate(['./principal/']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HabitacoesCadastrarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HabitacoesCadastrarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HabitacoesCadastrarComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HabitacoesCadastrarComponent.prototype, "valor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], HabitacoesCadastrarComponent.prototype, "qtdFamiliares", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HabitacoesCadastrarComponent.prototype, "mostrarFormulario", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HabitacoesCadastrarComponent.prototype, "totalizador", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HabitacoesCadastrarComponent.prototype, "habilitarSave", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HabitacoesCadastrarComponent.prototype, "hasError", void 0);
    HabitacoesCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'habitacoes-cadastrar',
            providers: [globals_1.Globals],
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], HabitacoesCadastrarComponent);
    return HabitacoesCadastrarComponent;
}());
exports.HabitacoesCadastrarComponent = HabitacoesCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map