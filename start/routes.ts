import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.post('/oauth', 'AuthController.login')
Route.get('/oauth', 'AuthController.profile')

Route.group(() => {
  Route.resource('/modules/:module', 'ModulesController')
  Route.post('/modules/:module/:id/relationships/:method/:related', 'ModulesController.related')
  Route.post('/confirm-password', 'AuthController.confirmPassword')

  Route.get('/file-system/tree', 'FileSystemController.tree')
  Route.get('/file-system/details', 'FileSystemController.details')
  Route.get('/file-system/show/:uuid', 'FileSystemController.show')
  Route.delete('/file-system', 'FileSystemController.destroy')
}).prefix('v1')
