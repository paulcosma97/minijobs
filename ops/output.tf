output "server_lambda_api" {
  value = aws_api_gateway_deployment.server_lambda_gw.invoke_url
}

output "dynamo_tables" {

  value = flatten([
    aws_dynamodb_table.jobs.*.id,
    aws_dynamodb_table.users.*.id])
}