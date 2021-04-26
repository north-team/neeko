import {get, post, del, patch} from "@/plugins/request"

const proxyUrl = "/proxy/kubernetes/{cluster_name}/{resource_url}"
const limit = 10

const nodesUrl = "api/v1/nodes"
const nodeStatsSummaryUrl = "apis/metrics.k8s.io/v1beta1/nodes"
const baseUrl = "/clusters/node/{clusterName}"

export function listNodesUsage(clusterName, continueToken) {
  let url = proxyUrl.replace("{cluster_name}", clusterName).replace("{resource_url}", nodeStatsSummaryUrl)
  url += "?limit=" + limit
  if (continueToken !== undefined && continueToken !== null) {
    url += "&continue=" + continueToken
  }
  return get(url)
}

export function cordonNode(clusterName, nodeName, data) {
  let headers = {"Content-Type": "application/strategic-merge-patch+json"}
  let url = proxyUrl.replace("{cluster_name}", clusterName).replace("{resource_url}", nodesUrl) + "/" + nodeName
  return patch(url, headers, data)
}

export function listNodeInDB(clusterName) {
  return get(`clusters/node/${clusterName}`)
}

export function listNodeInCluster(clusterName, continueToken) {
  let url = proxyUrl.replace("{cluster_name}", clusterName).replace("{resource_url}", nodesUrl)
  url += "?limit=" + limit
  if (continueToken !== undefined && continueToken !== null) {
    url += "&continue=" + continueToken
  }
  return get(url)
}

export function listNodesByPage(clusterName, pageNum, pageSize) {
  return get(`/clusters/node/${clusterName}?pageNum=${pageNum}&pageSize=${pageSize}`)
}

export function nodeCreate(clusterName, data) {
  return post(baseUrl.replace("{clusterName}", clusterName), data)
}

export function nodeDelete(clusterName, nodeName) {
  return del(`/clusters/node/${clusterName}/${nodeName}`)
}