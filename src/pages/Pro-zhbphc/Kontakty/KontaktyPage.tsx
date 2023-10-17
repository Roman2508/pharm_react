import React from 'react'
import { SubmitHandler, Controller, useForm } from 'react-hook-form'

import { gql } from '../../../graphql/client'
import styles from '../ProZhbphc.module.scss'
import { validEmail } from '../../../utils/validMali'
import Input from '../../../components/ui/Input/Input'
import { scrollToTop } from '../../../utils/scrollToTop'
import Button from '../../../components/ui/Button/Button'
import Select from '../../../components/ui/Select/Select'
import Skeleton from '../../../components/Skeleton/Skeleton'
import SelectItem from '../../../components/ui/Select/SelectItem'
import { Textarea } from '../../../components/ui/Textarea/Textarea'
import ContactsItem from '../../../components/Contacts/ContactsItem'
import { GetAdministrationQuery } from '../../../graphql/__generated__'
import contactsStyles from '../../../components/Contacts/Contacts.module.scss'

export interface IFormFields {
  name: string
  email: string
  body: string
  topic: string
}

const topicList = [
  { id: 1, text: '- Тема повідомлення -' },
  { id: 2, text: 'Загальне питання' },
  { id: 3, text: 'Питання до адміністрації' },
  { id: 4, text: 'Питання про вступ' },
]

export const KontaktyPage: React.FC = () => {
  const [administration, setAdministration] = React.useState<GetAdministrationQuery>()

  const {
    control,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    getValues,
  } = useForm<IFormFields>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        const administration = await gql.GetAdministration()
        setAdministration(administration)
      } catch (err) {
        console.log(err, 'kontakty page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    const res = await fetch('/api/sendgrid', {
      body: JSON.stringify({
        email: data.email,
        fullname: data.name,
        subject: data.topic,
        message: data.body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    if (error) {
      alert('Помилка при відправці повідомлення!')
    } else {
      alert('Повідомлення відправлено!')
    }
  }

  return (
    <div className="contacts">
      <div className="container">
        {administration ? (
          <h1 className="section-title">Контакти</h1>
        ) : (
          <Skeleton
            width="300"
            height="50"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '40px' }}
          />
        )}

        {administration ? (
          <iframe
            allowFullScreen
            frameBorder="0"
            height="250"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.243123431151!2d28.64189402690805!3d50.245541009318345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c648aed44e5cf%3A0x8c8080cc023799b!2z0JbQuNGC0L7QvNC40YDRgdC60LjQuSDQkdCw0LfQvtCy0YvQuSDQpNCw0YDQvNCw0YbQtdCy0YLQuNGH0LXRgdC60LjQuSDQmtC-0LvQu9C10LTQtiDQuNC8LiDQky7QoS7Qn9GA0L7RgtCw0YHQtdCy0LjRh9Cw!5e0!3m2!1sru!2sua!4v1545820629782"
            style={{ border: 0, margin: '40px 0' }}
            width="100%"
          />
        ) : (
          <Skeleton
            width="100%"
            height="250"
            radius="10"
            className={'section-title-center'}
            styles={{ margin: '40px 0' }}
          />
        )}

        <div className="page-row">
          <div className="col-8-12">
            <div className={styles['contacts__items']}>
              {administration
                ? administration.workers.data.map((el) => (
                    <ContactsItem
                      key={el.id}
                      name={el.attributes.name}
                      email={el.attributes.email}
                      phone={el.attributes.phone}
                      position={el.attributes.position}
                    />
                  ))
                : Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <div className={contactsStyles['contact__item']}>
                        <Skeleton
                          width="100"
                          height="20"
                          radius="10"
                          className={'section-title-center'}
                          styles={{ margin: '10px 0' }}
                        />
                        <Skeleton
                          width="180"
                          height="20"
                          radius="10"
                          className={'section-title-center'}
                          styles={{ margin: '10px 0' }}
                        />
                        <Skeleton
                          width="160"
                          height="20"
                          radius="10"
                          className={'section-title-center'}
                          styles={{ margin: '10px 0' }}
                        />
                        <Skeleton
                          width="200"
                          height="20"
                          radius="10"
                          className={'section-title-center'}
                          styles={{ margin: '10px 0' }}
                        />
                      </div>
                    ))}
            </div>
          </div>
          <div className="col-4-12">
            <h3 className="title-md">Задати питання</h3>

            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('name', {
                  required: "Ім'я обов'язкове",
                })}
                width="100%"
                label="Ваше ім`я"
                value={getValues().name}
                error={errors.name}
              />

              <Input
                {...register('email', {
                  required: "E-mail обов'язковий",
                  pattern: {
                    value: validEmail,
                    message: 'Не вірний формат пошти',
                  },
                })}
                width="100%"
                label="Ваш E-mail"
                value={getValues().email}
                error={errors.email}
              />

              <Controller
                control={control}
                name="topic"
                defaultValue={topicList[0].text}
                rules={{
                  validate: (value: string) => value !== '- Тема повідомлення -',
                }}
                render={({
                  field: { onChange, value, ref /* , name, onBlur */ },
                  fieldState: { error /* , invalid, isTouched, isDirty */ },
                  // formState,
                }) => {
                  return (
                    <Select
                      inputRef={ref}
                      error={!!error}
                      activeItem={value}
                      isSubmitting={isSubmitting}
                      label={'- Тема повідомлення -'}
                    >
                      {topicList.map((el) => (
                        <SelectItem value={el.text} key={el.id} onClick={() => onChange(el.text)} />
                      ))}
                    </Select>
                  )
                }}
              />

              <Textarea
                {...register('body', {
                  required: "Текст повідомлення обов'язковий",
                })}
                width="100%"
                label="Текст повідомлення"
                value={getValues().body}
                error={errors.body}
              />
              <Button disabled={!isDirty || !isValid || isSubmitting}>Відправити повідомлення</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
