import { Component, Inject, Directive, Output, Input, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router'

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'habitacoes-cadastrar',
  providers: [ Globals ],
  templateUrl: './cadastrar.component.html'
})

export class HabitacoesCadastrarComponent implements OnInit, AfterViewInit {

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;
  @Input() valor: string = "0,00";
  @Input() qtdFamiliares: number = 0;
  @Input() mostrarFormulario: boolean = true;
  @Input() totalizador: string = "0,00";
  @Input() habilitarSave: boolean = true;

  @Input() hasError: any = {
    titular_1: {hasError: null, msg: null},
    naturalidade_1: {hasError: null, msg: null},
    pai_1: {hasError: null, msg: null},
    mae_1: {hasError: null, msg: null},
    nascimento_1: {hasError: null, msg: null},
    estado_civil_1: {hasError: null, msg: null},
    escolaridade_1: {hasError: null, msg: null},
    cpf_1: {hasError: null, msg: null},
    rg_1: {hasError: null, msg: null},
    viculo_titular_1_com_titular_2: {hasError: null, msg: null},
    atividade_1: {hasError: null, msg: null},
    renda_1: {hasError: null, msg: null},
    informal_1: {hasError: null, msg: null},
    formal_1: {hasError: null, msg: null},
    empresa_1: {hasError: null, msg: null},
    pcd_1: {hasError: null, msg: null},
    pcd_qual_1: {hasError: null, msg: null},
    doenca_grave_1: {hasError: null, msg: null},
    doenca_qual_1: {hasError: null, msg: null},
    bolsa_familia_1: {hasError: null, msg: null},
    bolsa_familia_valor_1: {hasError: null, msg: null},
    bpc_1: {hasError: null, msg: null},
    bpc_valor_1: {hasError: null, msg: null},
    inscrito_cadastro_unico_1: {hasError: null, msg: null},
    inscricao_cadastro_unico_1: {hasError: null, msg: null},
    titular_2: {hasError: null, msg: null},
    naturalidade_2: {hasError: null, msg: null},
    pai_2: {hasError: null, msg: null},
    mae_2: {hasError: null, msg: null},
    nascimento_2: {hasError: null, msg: null},
    estado_civil_2: {hasError: null, msg: null},
    escolaridade_2: {hasError: null, msg: null},
    cpf_2: {hasError: null, msg: null},
    rg_2: {hasError: null, msg: null},
    viculo_titular_2_com_titular_1: {hasError: null, msg: null},
    atividade_2: {hasError: null, msg: null},
    renda_2: {hasError: null, msg: null},
    informal_2: {hasError: null, msg: null},
    formal_2: {hasError: null, msg: null},
    empresa_2: {hasError: null, msg: null},
    pcd_2: {hasError: null, msg: null},
    pcd_qual_2: {hasError: null, msg: null},
    doenca_grave_2: {hasError: null, msg: null},
    doenca_qual_2: {hasError: null, msg: null},
    bolsa_familia_2: {hasError: null, msg: null},
    bolsa_familia_valor_2: {hasError: null, msg: null},
    bpc_2: {hasError: null, msg: null},
    bpc_valor_2: {hasError: null, msg: null},
    inscrito_cadastro_unico_2: {hasError: null, msg: null},
    inscricao_cadastro_unico_2: {hasError: null, msg: null},
    endereco: {hasError: null, msg: null},
    numero: {hasError: null, msg: null},
    bairro: {hasError: null, msg: null},
    telefones: {hasError: null, msg: null},
    tempo_moradia_anos: {hasError: null, msg: null},
    tempo_moradia_meses: {hasError: null, msg: null},
    procedencia_municipio: {hasError: null, msg: null},
    procedencia_uf: {hasError: null, msg: null},
    cooperativa_inscricao: {hasError: null, msg: null},
    cooperativa_nome: {hasError: null, msg: null},
    moradia_atual: {hasError: null, msg: null},
    ocupacao: {hasError: null, msg: null},
    titular: {hasError: null, msg: null},
    cras: {hasError: null, msg: null},
    caps: {hasError: null, msg: null},
    associacao_moradores: {hasError: null, msg: null},
    comprovante_residencia: {hasError: null, msg: null},
    comprovante_tempo_campo_bom: {hasError: null, msg: null},
    comprovante_cpf_rg: {hasError: null, msg: null},
    comprovante_renda: {hasError: null, msg: null},
    comprovante_deficiencia_doenca_grave: {hasError: null, msg: null},
    observacao: {hasError: null, msg: null}
  };

  private id: number;
  private sub: any;

  private habitacoes: any = {
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
    titular:"",
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

  private composicaoFamiliar: any = {
    nome_completo : "",
    vinculo : "",
    dt_nascimento : "",
    cpf : "",
    rg : "",
    escolaridade : "",
    atividade : "",
    pcd : false,
    pcd_qual : "",
    doenca_grave : false,
    doenca_qual : "",
    bolsa_familia : false,
    bolsa_familia_valor : "",
    bpc : false,
    bpc_valor : "",
    inscrito_cadastro_unico : false,
    inscricao_cadastro_unico : "",
    renda : ""
  };

  private escolaridades: Array<Object> = [
    {descricao: 'Fundamental - Incompleto'},
    {descricao: 'Fundamental - Completo'},
    {descricao: 'Médio - Incompleto'},
    {descricao: 'Médio - Completo'},
    {descricao: 'Superior - Incompleto'},
    {descricao: 'Superior - Completo'},
    {descricao: 'Pós-graduação (Lato senso) - Incompleto'},
    {descricao: 'Pós-graduação (Lato senso) - Completo'},
    {descricao: 'Pós-graduação (Stricto sensu, nível mestrado) - Incompleto'},
    {descricao: 'Pós-graduação (Stricto sensu, nível mestrado) - Completo'},
    {descricao: 'Pós-graduação (Stricto sensu, nível doutor) - Incompleto'},
    {descricao: 'Pós-graduação (Stricto sensu, nível doutor) - Completo'}
  ];

  private estadoCivil: Array<Object> = [
    {descricao: 'Solteiro(a)'},
    {descricao: 'Casado(a)'},
    {descricao: 'Divorciado(a)'},
    {descricao: 'Viúvo(a)'},
    {descricao: 'Separado(a)'},
    {descricao: 'União Estável'},
    {descricao: 'Outros'}
  ];

  private titularChefe: Array<Object> = [
    {descricao: 'PCD CHEFE'},
    {descricao: 'IDOSO CHEFE'},
    {descricao: 'MULHER CHEFE'},
    {descricao: 'HOMEM CHEFE'}
  ];

  private ufs: Array<Object> = [
    {value:'RS', descricao: 'Rio Grande do Sul'},
    {value:'AC', descricao: 'Acre'},
    {value:'AL', descricao: 'Alagoas'},
    {value:'AP', descricao: 'Amapá'},
    {value:'AM', descricao: 'Amazonas'},
    {value:'BA', descricao: 'Bahia'},
    {value:'CE', descricao: 'Ceará'},
    {value:'DF', descricao: 'Distrito Federal'},
    {value:'ES', descricao: 'Espírito Santo'},
    {value:'GO', descricao: 'Goiás'},
    {value:'MA', descricao: 'Maranhão'},
    {value:'MT', descricao: 'Mato Grosso'},
    {value:'MS', descricao: 'Mato Grosso do Sul'},
    {value:'MG', descricao: 'Minas Gerais'},
    {value:'PA', descricao: 'Pará'},
    {value:'PB', descricao: 'Paraíba'},
    {value:'PR', descricao: 'Paraná'},
    {value:'PE', descricao: 'Pernambuco'},
    {value:'PI', descricao: 'Piauí'},
    {value:'RJ', descricao: 'Rio de Janeiro'},
    {value:'RN', descricao: 'Rio Grande do Norte'},
    {value:'RO', descricao: 'Rondônia'},
    {value:'RR', descricao: 'Roraima'},
    {value:'SC', descricao: 'Santa Catarina'},
    {value:'SP', descricao: 'São Paulo'},
    {value:'SE', descricao: 'Sergipe'},
    {value:'TO', descricao: 'Tocantins'}
  ];

  private moradaAtual: Array<Object> = [
    {descricao: 'Alugada'},
    {descricao: 'Cedida'},
    {descricao: 'Ocupação'}
  ];

  private grupoFamiliar: Array<Object> = [];
  private familia: Array<Object> = [];
  private telefones: Array<Object> = [];
  private telefone: string = "";

  private masks: Array<Object> = [
    {id:"nascimento_1", tipo:"data"},
    {id:"cpf_1", tipo:"cpf"},
    {id:"renda_1", tipo:"dinheiro"},
    {id:"nascimento_2", tipo:"data"},
    {id:"cpf_2", tipo:"cpf"},
    {id:"renda_2", tipo:"dinheiro"},
    {id:"bolsa_familia_valor_1", tipo:"dinheiro"},
    {id:"bpc_valor_1", tipo:"dinheiro"},
    {id:"bolsa_familia_valor_2", tipo:"dinheiro"},
    {id:"bpc_valor_2", tipo:"dinheiro"},
    {id:"telefone", tipo:"telefone"},
    {id:"composicao_familiar_dt_nascimento", tipo:"data"},
    {id:"composicao_familiar_cpf", tipo:"cpf"},
    {id:"composicao_familiar_renda", tipo:"dinheiro"},
    {id:"composicao_familiar_bolsa_familia_valor", tipo:"dinheiro"},
    {id:"composicao_familiar_bpc_valor", tipo:"dinheiro"}
  ];

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private globals: Globals,
    private router: Router ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
       this.id = + params['id']; // (+) converts string 'id' to a number
       if (!isNaN(this.id)) this.getHabitacao(this.id);
    });
  }

  ngAfterViewInit() {
    this.masks.map(item => {
      if (item.tipo === "data") {
        this.setMaskData(item.id);
      } else if (item.tipo === "dinheiro") {
        this.setMaskMoney(item.id);
      } else if (item.tipo === "cpf") {
        this.setMaskCpf(item.id);
      } else if (item.tipo === "telefone") {
        this.setMaskTelefone(item.id);
      }
    });
  }

  public limparCampos(opcao) {
    this.mensagem = null;
    for(let k in this.hasError) {
      if (k == opcao) {
        this.hasError[k].hasError = null;
        this.hasError[k].msg = null;
      }
    }
  }

  public beforeSave(event) {
    event.preventDefault();
    let verificar = true;

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
      } else if (parseInt(this.habitacoes.tempo_moradia_anos) > 100) {
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
      } else {
        let mes = parseInt(this.habitacoes.tempo_moradia_meses);
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
      this.habitacoes.telefones = this.telefones.map(item => item).join(` | `);

      this.familia = this.grupoFamiliar.map((item, index) => {
        if (!item.deleted) {
          item.dt_nascimento = $(`#gf_dt_nascimento_${index}`).val();
          item.renda = $(`#gf_renda_${index}`).val();
          return item;
        }
      });

      this.familia = this.familia.filter(item => typeof item != "undefined").map(item=>item);

      this.verificarCpf();

    } else {
      $("#tab-info").click();
    }
  }

  public verificarCpf() {

    let cpf1 = $("#cpf_1").val();
    let cpf2 = ($("#cpf_2").val() == "") ? 0 : $("#cpf_2").val();
    let id = isNaN(this.id) ? 0 : this.id;

    let url = this.globals.url + '/habitacoes/cpf/' + id + '/' + cpf1 + '/' + cpf2;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        this.save();
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 403) {
          let msg = error.json();
          this.setMensagem('alert-danger', msg.msg, 'Erro', null);
        } else if (error.status == 400) {
          let msg = error.json();
          if (typeof msg.msg == "undefined") {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', msg.msg, 'Erro', null);
          }
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public save(event) {

    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    let dados = {
      habitacoes: this.habitacoes,
      composicao_familiar: this.familia
    }

    if (isNaN(this.id) || this.id === "") {

      let url = this.globals.url + '/habitacoes/habitacao';
      this.http.post(url, JSON.stringify(dados), { headers: headers })
        .subscribe((response) => {
          let res = response.json();
          this.id = res.id;
          this.setGrupoFamiliar(res.composicao_familiar);
          this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
        }, error =>  {
          console.log('error', error);
          if (error.status == 0) {
            this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
          } else if (error.status == 401) {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else if (error.status == 400) {
            let msg = error.json();
            if (typeof msg.msg == "undefined") {
              this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            } else {
              this.setMensagem('alert-danger', msg.msg, 'Erro', null);
            }
          } else if (error.status == 500) {
            this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
          }
        });
    } else {

      let url = this.globals.url + '/habitacoes/habitacao/' + this.id;
      this.http.put(url, JSON.stringify(dados), { headers: headers })
        .subscribe((response) => {
          let res = response.json();
          this.setGrupoFamiliar(res.composicao_familiar);
          this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
        }, error =>  {
          console.log('error', error);
          if (error.status == 0) {
            this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
          } else if (error.status == 401) {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else if (error.status == 400) {
            let msg = error.json();
            if (typeof msg.msg == "undefined") {
              this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            } else {
              this.setMensagem('alert-danger', msg.msg, 'Erro', null);
            }
          } else if (error.status == 500) {
            this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
          }
        });
    }
  }

  public getHabitacao(id) {
    let url = this.globals.url + '/habitacoes/habitacao/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let res = response.json();
        this.habitacoes = res.habitacoes;
        this.habitacoes.nascimento_1 = this.date_format(this.habitacoes.nascimento_1);
        this.habitacoes.nascimento_2 = this.date_format(this.habitacoes.nascimento_2);
        this.habitacoes.renda_1 = this.number_format(this.habitacoes.renda_1, 2, ',', '.');
        this.habitacoes.renda_2 = this.number_format(this.habitacoes.renda_2, 2, ',', '.');
        this.habitacoes.bolsa_familia_valor_1 = this.number_format(this.habitacoes.bolsa_familia_valor_1, 2, ',', '.');
        this.habitacoes.bpc_valor_1 = this.number_format(this.habitacoes.bpc_valor_1, 2, ',', '.');
        this.habitacoes.bolsa_familia_valor_2 = this.number_format(this.habitacoes.bolsa_familia_valor_2, 2, ',', '.');
        this.habitacoes.bpc_valor_2 = this.number_format(this.habitacoes.bpc_valor_2, 2, ',', '.');
        this.telefones = this.habitacoes.telefones.split(` | `);
        this.setGrupoFamiliar(res.composicao_familiar);
        console.log(this.habitacoes);
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public date_format(dt) {
    let data = new Date(dt);
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    dia = this.str_pad(dia, 2, 0, "STR_PAD_LEFT");
    mes = this.str_pad(mes, 2, 0, "STR_PAD_LEFT");
    return `${dia}/${mes}/${data.getFullYear()}`;
  }

  public setGrupoFamiliar(composicao_familiar) {
    this.grupoFamiliar = [];
    this.grupoFamiliar = composicao_familiar;
    this.grupoFamiliar.map((item, index) => {
      item.dt_nascimento = this.date_format(item.dt_nascimento);
      item.renda = this.number_format(item.renda, 2, ',', '.');
      item.bolsa_familia_valor = this.number_format(item.bolsa_familia_valor, 2, ',', '.');
      item.bpc_valor = this.number_format(item.bpc_valor, 2, ',', '.');
      //this.verificarCampo(`gf_dt_nascimento_${index}`, `data`);
      //this.verificarCampo(`gf_renda_${index}`, `dinheiro`);
    });
    this.calcularTotal();
  }

  public setMensagem(status, msg, alertStatus, event) {
    if (event) event.preventDefault();
    this.status = status;
    this.mensagem = msg;
    this.alertStatus = alertStatus;
  }

  public setCheckbox(event, elemento, opcao){
    event.preventDefault();
  }

  public addGrupoFamiliar(event){
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
  }

  public addNewGrupoFamiliar(event) {
    event.preventDefault();

    let familia: any = {
      id: "",
      nome_completo : this.composicaoFamiliar.nome_completo,
      vinculo : this.composicaoFamiliar.vinculo,
      dt_nascimento : $("#composicao_familiar_dt_nascimento").val(),
      cpf : $("#composicao_familiar_cpf").val(),
      rg : this.composicaoFamiliar.rg,
      escolaridade : this.composicaoFamiliar.escolaridade,
      atividade : this.composicaoFamiliar.atividade,
      pcd : this.composicaoFamiliar.pcd,
      pcd_qual : this.composicaoFamiliar.pcd_qual,
      doenca_grave : this.composicaoFamiliar.doenca_grave,
      doenca_qual : this.composicaoFamiliar.doenca_qual,
      bolsa_familia : this.composicaoFamiliar.bolsa_familia,
      bolsa_familia_valor : $("#composicao_familiar_bolsa_familia_valor").val(),
      bpc : this.composicaoFamiliar.bpc,
      bpc_valor : $("#composicao_familiar_bpc_valor").val(),
      inscrito_cadastro_unico : this.composicaoFamiliar.inscrito_cadastro_unico,
      inscricao_cadastro_unico : this.composicaoFamiliar.inscricao_cadastro_unico,
      renda : $("#composicao_familiar_renda").val()
    };

    this.grupoFamiliar.push(familia);
    this.mostrarFormulario = !this.mostrarFormulario;
    this.habilitarSave = !this.habilitarSave;
    this.calcularTotal();
  }

  public deleteComposicaoFamiliar(id, index) {
    let url = this.globals.url + '/composicao_familiar/composicao_familiar/' + id;
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');
    this.http.delete(url, { headers: headers })
      .subscribe((response) => {
        this.removeItemGrupoFamiliarView(index);
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 400) {
          let msg = error.json();
          if (typeof msg.msg == "undefined") {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', msg.msg, 'Erro', null);
          }
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public removeItemGrupoFamiliarView(index) {
    this.grupoFamiliar.map((item,i) => {
      if (i == index) {
        item.deleted = true;
      }
    });
    this.calcularTotal();
  }

  public removeItemGrupoFamiliar(event, gf, index) {
    event.preventDefault();
    if (gf.id === "") {
      this.removeItemGrupoFamiliarView(index);
    } else {
      this.deleteComposicaoFamiliar(gf.id, index);
    }
  }

  public verificarCampo(id, opcao) {
    if ($(`#${id}`).size() == 0) {
      setTimeout(() => {
        this.verificarCampo(id, opcao);
      }, 1000);
    }else {
      if (opcao == 'dinheiro') this.setMaskMoney(id);
      if (opcao == 'data') this.setMaskData(id);
    }
  }

  public setMaskMoney(id) {
    $(`#${id}`).maskMoney({
      thousands: ".",
      decimal: ",",
      prefix: '',
      precision: 2
    });
  }

  public setMaskData(id) {
    $(`#${id}`).datetimepicker({
      locale: "pt-br",
      format : "DD/MM/YYYY"
    });
    $(`#${id}`).mask("99/99/9999");
  }

  public setMaskCpf(id) {
    $(`#${id}`).mask("999.999.999-99");
  }

  public setMaskTelefone(id) {
    $(`#${id}`).mask("(00) 0000-00009");
  }

  public visualizar(event) {
    event.preventDefault();
    console.log(this.grupoFamiliar);
  }

  public str_pad (input, padLength, padString, padType) {
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

    var half = ''
    var padToGo

    var _strPadRepeater = function (s, len) {
      var collect = ''

      while (collect.length < len) {
        collect += s
      }
      collect = collect.substr(0, len)

      return collect
    }

    input += ''
    padString = padString !== undefined ? padString : ' '

    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
      padType = 'STR_PAD_RIGHT'
    }
    if ((padToGo = padLength - input.length) > 0) {
      if (padType === 'STR_PAD_LEFT') {
        input = _strPadRepeater(padString, padToGo) + input
      } else if (padType === 'STR_PAD_RIGHT') {
        input = input + _strPadRepeater(padString, padToGo)
      } else if (padType === 'STR_PAD_BOTH') {
        half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
        input = half + input + half
        input = input.substr(0, padLength)
      }
    }

    return input
  }

  public number_format (valor, decimals, decPoint, thousandsSep) {
    valor = (valor + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+valor) ? 0 : +valor
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec)
      return '' + (Math.round(n * k) / k)
        .toFixed(prec)
    }

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
  }

  public calcularTotal() {
    let valor = 0;
    this.qtdFamiliares = 0;
    this.grupoFamiliar.map((item, index) => {
      if(!item.deleted) {

        let renda = 0;
        let bolsa_familia_valor = 0;
        let bpc_valor = 0;

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
        this.qtdFamiliares++;
      }
    });
    this.valor = this.number_format(valor, 2, ',', '.');
  }

  public addTelefone(event) {
    event.preventDefault();
    if($("#telefone").val() != "") {
      this.telefones.push($("#telefone").val());
      $("#telefone").val("");
    }
  }

  public removeItemTelefones(event, index){
    event.preventDefault();
    this.telefones.splice(index, 1);
  }

  public calcularTotalizador() {
    let val1 = $("#renda_1").val() || "0,00";
    let val2 = $("#renda_2").val() || "0,00";
    val1 = val1.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
    val2 = val2.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
    val1 = parseFloat(parseFloat(val1).toFixed(2));
    val2 = parseFloat(parseFloat(val2).toFixed(2));
    let total = (val1 + val2);
    this.totalizador = this.number_format(total, 2, ',', '.');
  }

  public limparForm(event) {

    event.preventDefault();

    this.hasError = {
      titular_1: {hasError: null, msg: null},
      naturalidade_1: {hasError: null, msg: null},
      pai_1: {hasError: null, msg: null},
      mae_1: {hasError: null, msg: null},
      nascimento_1: {hasError: null, msg: null},
      estado_civil_1: {hasError: null, msg: null},
      escolaridade_1: {hasError: null, msg: null},
      cpf_1: {hasError: null, msg: null},
      rg_1: {hasError: null, msg: null},
      viculo_titular_1_com_titular_2: {hasError: null, msg: null},
      atividade_1: {hasError: null, msg: null},
      renda_1: {hasError: null, msg: null},
      informal_1: {hasError: null, msg: null},
      formal_1: {hasError: null, msg: null},
      empresa_1: {hasError: null, msg: null},
      pcd_1: {hasError: null, msg: null},
      pcd_qual_1: {hasError: null, msg: null},
      doenca_grave_1: {hasError: null, msg: null},
      doenca_qual_1: {hasError: null, msg: null},
      bolsa_familia_1: {hasError: null, msg: null},
      bolsa_familia_valor_1: {hasError: null, msg: null},
      bpc_1: {hasError: null, msg: null},
      bpc_valor_1: {hasError: null, msg: null},
      inscrito_cadastro_unico_1: {hasError: null, msg: null},
      inscricao_cadastro_unico_1: {hasError: null, msg: null},
      titular_2: {hasError: null, msg: null},
      naturalidade_2: {hasError: null, msg: null},
      pai_2: {hasError: null, msg: null},
      mae_2: {hasError: null, msg: null},
      nascimento_2: {hasError: null, msg: null},
      estado_civil_2: {hasError: null, msg: null},
      escolaridade_2: {hasError: null, msg: null},
      cpf_2: {hasError: null, msg: null},
      rg_2: {hasError: null, msg: null},
      viculo_titular_2_com_titular_1: {hasError: null, msg: null},
      atividade_2: {hasError: null, msg: null},
      renda_2: {hasError: null, msg: null},
      informal_2: {hasError: null, msg: null},
      formal_2: {hasError: null, msg: null},
      empresa_2: {hasError: null, msg: null},
      pcd_2: {hasError: null, msg: null},
      pcd_qual_2: {hasError: null, msg: null},
      doenca_grave_2: {hasError: null, msg: null},
      doenca_qual_2: {hasError: null, msg: null},
      bolsa_familia_2: {hasError: null, msg: null},
      bolsa_familia_valor_2: {hasError: null, msg: null},
      bpc_2: {hasError: null, msg: null},
      bpc_valor_2: {hasError: null, msg: null},
      inscrito_cadastro_unico_2: {hasError: null, msg: null},
      inscricao_cadastro_unico_2: {hasError: null, msg: null},
      endereco: {hasError: null, msg: null},
      numero: {hasError: null, msg: null},
      bairro: {hasError: null, msg: null},
      telefones: {hasError: null, msg: null},
      tempo_moradia_anos: {hasError: null, msg: null},
      tempo_moradia_meses: {hasError: null, msg: null},
      procedencia_municipio: {hasError: null, msg: null},
      procedencia_uf: {hasError: null, msg: null},
      cooperativa_inscricao: {hasError: null, msg: null},
      cooperativa_nome: {hasError: null, msg: null},
      moradia_atual: {hasError: null, msg: null},
      ocupacao: {hasError: null, msg: null},
      titular: {hasError: null, msg: null},
      cras: {hasError: null, msg: null},
      caps: {hasError: null, msg: null},
      associacao_moradores: {hasError: null, msg: null},
      comprovante_residencia: {hasError: null, msg: null},
      comprovante_tempo_campo_bom: {hasError: null, msg: null},
      comprovante_cpf_rg: {hasError: null, msg: null},
      comprovante_renda: {hasError: null, msg: null},
      comprovante_deficiencia_doenca_grave: {hasError: null, msg: null},
      observacao: {hasError: null, msg: null}
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
      titular:"",
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
  }

  public fecharView(event) {
    event.preventDefault();
    this.router.navigate(['./principal/']);
  }
}