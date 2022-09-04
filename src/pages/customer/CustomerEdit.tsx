import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {  checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Customer from './Customer';
import { saveAndEditCustomer, searchCustomerById } from './CustomerApi';


const CustomerEdit: React.FC = () => {
  const { name } = useParams<{ name: string;}>();
  const routeMatch: any = useRouteMatch("/page/customer/:id");
  const [customer, setCustomer] = useState<Customer>({});

  const history = useHistory();

  let id = routeMatch?.params?.id;


  useEffect(() => {
    search();
  },[history.location.pathname]);

  const save = async () => {  
    await saveAndEditCustomer(customer);
    history.push('/page/customers');
  }

  const search = async () =>{
    if(id === 'new'){
      setCustomer({});
    }else{
      let result = await searchCustomerById(id);
      setCustomer(result);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>{id === 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>

                  <IonRow>
                      <IonCol>
                          <IonItem>
                              <IonLabel position="floating">Nombre</IonLabel>
                              <IonInput onIonChange={e => customer.firstname = String(e.detail.value)} value={customer.firstname}></IonInput>
                          </IonItem>
                      </IonCol>
                      <IonCol>
                          <IonItem>
                              <IonLabel position="floating">Apellido</IonLabel>
                              <IonInput onIonChange={e => customer.lastname = String(e.detail.value)}  value={customer.lastname}></IonInput>
                          </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                          <IonItem>
                              <IonLabel position="floating">Email</IonLabel>
                              <IonInput onIonChange={e => customer.email = String(e.detail.value)}  value={customer.email}></IonInput>
                          </IonItem>
                      </IonCol>
                      <IonCol>
                          <IonItem>
                              <IonLabel position="floating">Direccion</IonLabel>
                              <IonInput onIonChange={e => customer.address = String(e.detail.value)}  value={customer.address}></IonInput>
                          </IonItem>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                          <IonItem>
                              <IonLabel position="floating">Telefono</IonLabel>
                              <IonInput onIonChange={e => customer.phone = String(e.detail.value)}  value={customer.phone}></IonInput>
                          </IonItem>
                      </IonCol>
                  </IonRow>

        <IonItem>
            <IonButton onClick={save} color="success" fill="solid" slot='end' size='default'>
                <IonIcon icon={checkmark} />
                Guardar
                </IonButton>
        </IonItem>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;
