import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import waterQualityFactors from '../data/waterQualityFactors.json'
import { setEndUseQualityCategory, setEndUseQualityClass } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Bar } from './Bar'
import { useTheme } from '@material-ui/core/styles'

export default function PersonalizeSolutions() {
  const caseState = useSelector(state => state.case)

  const dispatch = useDispatch()

  const theme = useTheme()

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('Personalize Solutions')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Category')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="category"
          options={waterQualityCategories}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityCategory(newValue.id))}
          disableClearable
          value={endUse.category !== null ? waterQualityCategories[endUse.category] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about categories">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Water Quality Class')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="quality"
          options={waterQualities.filter(q => q.category === endUse.category)}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityClass(newValue.id))}
          disableClearable
          value={endUse.qualityClass !== null ? waterQualities[endUse.qualityClass] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
          disabled={endUse.category === null ? true : false}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about water quality classes">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>

      <Grid item container xs={12} justify="space-evenly" alignItems="center">
        {endUse.qualityClass !== null
          ? waterQualityFactors.map(f => {
              const key = f.name

              return (
                <div style={{ width: 'calc(1/6*80%' }}>
                  <Bar
                    factor={f.name}
                    unit={f.unit}
                    input={
                      waterQualities[inputQuality.qualityClass][key] < 0
                        ? null
                        : waterQualities[inputQuality.qualityClass][key]
                    }
                    output={
                      waterQualities[endUse.qualityClass][key] < 0 ? null : waterQualities[endUse.qualityClass][key]
                    }
                  />
                </div>
              )
            })
          : waterQualityFactors.map(f => {
              const key = f.name

              return (
                <div style={{ width: 'calc(1/6*80%' }}>
                  <Bar
                    factor={f.name}
                    unit={f.unit}
                    input={
                      waterQualities[inputQuality.qualityClass][key] < 0
                        ? null
                        : waterQualities[inputQuality.qualityClass][key]
                    }
                  />
                </div>
              )
            })}
      </Grid>

      <Grid item container xs={12} justify="space-evenly" alignItems="flex-start">
        <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
              <g>
                <rect width="10" height="10" fill={theme.palette.primary.main} stroke-width="0"></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('Input')}</Typography>
          </Grid>
        </Grid>

        <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
              <g>
                <rect width="10" height="10" fill={theme.palette.error.main} stroke-width="0"></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('End use above Input, needs treatment')}</Typography>
          </Grid>
        </Grid>

        <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
              <g>
                <rect width="10" height="10" fill={theme.palette.success.main} stroke-width="0"></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('End use below Input, no treatment needed')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}